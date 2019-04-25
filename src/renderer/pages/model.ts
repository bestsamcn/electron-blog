import { ResponseBody } from '@/utils/request';
import { getArticleList, getDiffArticle, getCommentList, getTagList } from '@/services';
import $$ from '@/utils';

/**
 * 文章类型
 */
enum ArticleType{
    CATEGORY = 1,
    TAG = 2,
    TOP = 4
}

//排名类型
enum RankType{
	HOT = 1,
	READ = 2,
	LATEST = 3,
	COMMENT = 4
}
export default {
	namespace:'home',
    state: {
        articleList:[],
	    pageIndex:1,
	    pageSize:5,
	    isMore:true,
	    categoryArticleGroup:[],
	    tagArticleGroup:[],
	    hotList:[],
        commentList:[],
        readNumList:[],
        latestList:[],
        tagList:[]
    },
    subscriptions: {
        init({ dispatch, history }:any) {
            dispatch({type: 'getArticleList', params:{}});
            dispatch({type: 'getDiffArticle', params:{type:ArticleType.CATEGORY}});
            dispatch({type: 'getDiffArticle', params:{type:ArticleType.TAG}});
            dispatch({type: 'getRankList', params:{type:RankType.HOT}});
            dispatch({type: 'getRankList', params:{type:RankType.LATEST}});
            dispatch({type: 'getRankList', params:{type:RankType.READ}});
            dispatch({type: 'getRankList', params:{type:RankType.COMMENT}});
        },
    },
    effects: {

        //文章列表
        * getArticleList({ params }:{params:any}, { put, call, select }:any) {
        	let { pageIndex, pageSize, articleList } = yield select((state:any)=>state.home);
        	let { isRefresh } = params;
            let res: ResponseBody;
            res = yield call(getArticleList, {pageIndex, pageSize, type:ArticleType.TOP});

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

        //获取不同类型文章数据
        * getDiffArticle({ params }:{params:any}, { put, call, select }:any) { 
            let res = yield call(getDiffArticle, {type:params.type});
            if(params.type == ArticleType.CATEGORY){
                yield put({type:'setState', payload:{categoryArticleGroup:res.data}});
            }else if(params.type == ArticleType.TAG){
                yield put({type:'setState', payload:{tagArticleGroup:res.data}});
            }
        },

        //排名列表
        * getRankList({ params }:{params:any}, { put, call, select }:any) { 
        	if(params.type === RankType.COMMENT){
        		let res = yield call(getCommentList, {pageIndex:1, pageSize:4});
        		yield put({type:'setState', payload:{commentList:res.data}});
        		return false;
        	}
        	let res = yield call(getArticleList, {type:params.type, pageIndex:1, pageSize:4});

        	if(params.type === RankType.HOT){
        		yield put({type:'setState', payload:{hotList:res.data}});
        	}
        	if(params.type === RankType.LATEST){
        		yield put({type:'setState', payload:{latestList:res.data}});
        	}
        	if(params.type === RankType.READ){
        		yield put({type:'setState', payload:{readNumList:res.data}});
        	}
        },
    },
    reducers: {
        setState(state: any, { payload }:any){
            return { ...state, ...payload };
        }
    }
}