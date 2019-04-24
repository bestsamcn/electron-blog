import { ResponseBody } from '@/utils/request';
import { getCategoryList } from '@/services';
import $$ from '@/utils';

export interface GlobalModelState {
    token: string,
    msg: string,
    isLogin:boolean,
    isLoading:boolean,
    isMobile:boolean,
    iShowMenu:boolean,
    clientHeight:number,
    hotWord:any,
    hotWordList:any[],
    articleParams:any
}

export default {
    state: {
        token:'',
	    isLogin:false,
	    isLoading:false,
	    isMobile:false,
	    msg:'',
	    clientHeight:0,
	    iShowMenu:false,
	    hotWord:{
	        isFromHotWord:false,
	        name:''
	    },
	    hotWordList:[],
	    articleParams:{category: "前端", tag: "", isFromHome: true}

    },
    subscriptions: {
        init({ dispatch, history }:any) {
            dispatch({ type: 'getCategoryList', params: {} });
            dispatch({ type: 'setMobile', params: {} });
        },
    },
    effects: {

    	//loading状态
    	* setLoading({ params:{isLoading} }:{params:any}, { put, call }:any) {
            yield put({type:'setState', payload:{isLoading}});
        },

        //提示状态
    	* setToast({ params:{msg} }:{params:any}, { put, call }:any) {
            yield put({type:'setState', payload:{msg}});
        },


        *setMobile({ params }:{params:any}, { put, call }:any) {
            yield put({type:'setState', payload:{isMobile:$$.isMobile()}})
        },

        //切换移动端菜单状态
        *setToggleMenu({ params }:{params:any}, { put, call, select }:any){
            let { iShowMenu } = yield select((state:any)=>state.global);
            yield put({type:'setState', payload:{iShowMenu:!iShowMenu}});
        },

        //设置文章参数
        *setArticleParams({ params }:{params:any}, { put, call, select }:any){
            let { category, tag, isFromHome } = params;
            yield put({type:'setState', payload:{articleParams:{category, tag, isFromHome}}});
            params.callback && params.callback();
        }


    },
    reducers: {
        setState(state: GlobalModelState, { payload }:any): GlobalModelState {
            return { ...state, ...payload };
        },
    },
};
