import { ResponseBody } from '@/utils/request';
import { getArticleDetail } from '@/services';
import $$ from '@/utils';


export default {
	namespace:'articleDetail',
    state: {
        article:{},
        parseHtml:'',
        editor:null,
        prevID:'',
        nextID:'',
        isLiked:false,
        type:1
    },
    subscriptions: {
        init({ dispatch, history }:any) {
        	history.listen(({pathname}:any)=>{

        		if(/article\/detail\/(.{24})/gi.test(pathname)){
        			let id = pathname.match(/article\/detail\/(.{24})$/)[1];
        			dispatch({type: 'getArticleDetail', params:{id, type:1}});
        		}
        	})
           
        },
    },
    effects: {

        //文章列表
        * getArticleDetail({ params }:{params:any}, { put, call, select }:any) {
        	let res = yield call(getArticleDetail, {id:params.id, type:1});
        	let _article:any = res.data.curr;
            let _prevID = res.data.prev && res.data.prev._id || '';
            let _nextID = res.data.next && res.data.next._id || '';
            yield put({type:'setState', payload:{article:_article, prevID:_prevID, nextID:_nextID}});
            if($$.getCookie(_article._id)){
                yield put({type:'setState', payload:{isLiked:true}});
            }
        },

        //点赞
        *likeArticle({ params }:{params:any}, { put, call, select }:any) {
        	let { article } = yield select((state:any)=>state.articleDetail);
        	$$.setCookie(article._id, true, 7);
            let _likeNum = article.likeNum+1;
            yield put({type:'setState', payload:{isLiked:true, article:{...article, likeNum: _likeNum}}});
        }



    },
    reducers: {
        setState(state: any, { payload }:any){
            return { ...state, ...payload };
        }
    }
}