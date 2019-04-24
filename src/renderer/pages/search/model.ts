import { ResponseBody } from '@/utils/request';
import { getArticleList } from '@/services';
import $$ from '@/utils';
import { PAGE_SIZE } from '@/config';


export default {
	namespace:'search',
    state: {
        pageIndex:1,
		pageSize:PAGE_SIZE,
		articleList:[],
		isMore:true,
        keyword:'',
        isCache:false
    },
    subscriptions: {
        init({ dispatch, history }:any) {
            // dispatch({type: 'getSearchList', params:{isRefresh:true}});
        },
    },
    effects: {

    	//回车
    	* onKeywordEnter({ params }:{params:{keyword:string, isMore:boolean}}, { put, call, select }:any) {
    		yield put({type:'setState', payload:{keyword:params.keyword}});
    		yield put({type:'getSearchList', params:{isRefresh:true, isMore:true}});
    	},

        //文章列表
        * getSearchList({ params }:{params:{isRefresh:boolean, isMore?:boolean}}, { put, call, select }:any) {

        	let { isMore, pageIndex, pageSize, keyword, articleList } = yield select((state:any)=>state.search);
        	let { isRefresh } = params;
        	isMore = isMore || params.isMore;
        	if(!isMore) return;
	        var obj = {
	            pageIndex:isRefresh ? 1 : pageIndex,
	            pageSize:pageSize,
	            keyword:keyword
	        }
	        let res = yield call(getArticleList, {...obj});
            res.data.map((item:any)=>{
                if($$.getCookie(item._id)){
                    return item.isLiked = true;
                }else{
                    return item.isLiked = false;
                }
            });
            
            if(isRefresh){
                yield put({type:'setState', payload:{articleList:res.data}});
            }else{
            	yield put({type:'setState', payload:{articleList:articleList.concat(res.data)}});
            }
            if(pageIndex * pageSize >= res.total){
            	yield put({type:'setState', payload:{isMore:false}});
            }else{
                let _pageIndex = pageIndex + 1;
                yield put({type:'setState', payload:{pageIndex:_pageIndex, isMore:false}});
            }
            yield put({type:'setState', payload:{isFirst:false}});
        }
    },
    reducers: {
        setState(state: any, { payload }:any){
            return { ...state, ...payload };
        }
    }
}