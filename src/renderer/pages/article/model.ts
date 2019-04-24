import { ResponseBody } from '@/utils/request';
import { getArticleList } from '@/services';
import { PAGE_SIZE } from '@/config';
import $$ from '@/utils';


export default {
	namespace:'article',
    state: {
        articleList:[],
        pageIndex:1,
        pageSize:PAGE_SIZE,
        tag:'',
        category:'',
        isMore:true
    },
    subscriptions: {
        init({ dispatch, history }:any) {
            dispatch({type: 'getArticleList', params:{}});
        },
    },
    effects: {

        //文章列表
        * getArticleList({ params }:{params:any}, { put, call, select }:any) {
        	let { isMore, pageIndex, pageSize, tag, category, articleList } = yield select((state:any)=>state.article);
        	if(!isMore) return;
	        var obj = {
	            pageIndex:pageIndex,
	            pageSize:pageSize,
	            tag:tag,
	            category:category
	        }
	        let res = yield call(getArticleList, {...obj});
            if(res.total <= pageSize * pageIndex){
                yield put({type:'setState', payload:{isMore:false}});
            }else{
                let _pageIndex = pageIndex + 1;
                yield put({type:'setState', payload:{isMore: true, pageIndex:_pageIndex}});
            }
            res.data.map((item:any)=>{
                if($$.getCookie(item._id)){
                    return item.isLiked = true;
                }else{
                    return item.isLiked = false;
                }
            });
            let _articleList = articleList.concat(res.data);
            params.isRefresh ? yield put({type:'setState', payload:{articleList:res.data}}) : yield put({type:'setState', payload:{articleList: _articleList}});
        },

        * setParams({ params }:{params:any}, { put, call, select }:any) {
            let {tag, category, isMore, pageIndex } =params;
            yield put({type:'setState', payload:{tag, category, isMore, pageIndex}});
            params.callback && params.callback();
        }


    },
    reducers: {
        setState(state: any, { payload }:any){
            return { ...state, ...payload };
        }
    }
}