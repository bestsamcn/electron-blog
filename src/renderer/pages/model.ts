import { ResponseBody } from '@/utils/request';
import { getArticleList, getDiffArticle } from '@/services';
import $$ from '@/utils';
console.log($$)

export default {
	namespace:'home',
    state: {
        articleList:[],
	    pageIndex:1,
	    pageSize:5,
	    isMore:true,
	    categoryArticleGroup:[],
	    tagArticleGroup:[]
    },
    subscriptions: {
        init({ dispatch, history }:any) {
            dispatch({type: 'getArticleList', params:{}});
        },
    },
    effects: {

        *getArticleList({ params }:{params:any}, { put, call, select }:any) {
        	let { pageIndex, pageSize, articleList } = yield select((state:any)=>state.home);
        	let { isRefresh } = params;
            let res: ResponseBody;
            res = yield call(getArticleList, {pageIndex, pageSize});

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
            if(pageIndex * pageSize >= res.total!){
            	yield put({type:'setState', payload:{isMore:false}});
            }else{
                let _pageIndex = pageIndex + 1;
                yield put({type:'setState', payload:{pageIndex:_pageIndex, isMore:true}});
            }
        },

        //切换移动端菜单状态
        *setToggleMenu({ params }:{params:any}, { put, call, select }:any){
            let { iShowMenu } = yield select((state:any)=>state.global);
            yield put({type:'setState', payload:{iShowMenu:!iShowMenu}});
        }
    },
    reducers: {
        setState(state: any, { payload }:any){
            return { ...state, ...payload };
        }
    }
}