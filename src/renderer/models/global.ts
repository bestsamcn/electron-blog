import { ResponseBody } from '@/utils/request';
import { getCategoryList } from '@/services';

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
        },
    },
    effects: {
        *getCategoryList({ params }:{params:any}, { put, call }:any) {
            let res: ResponseBody;
            res = yield call(getCategoryList, {});
            console.log(res);
        },
    },
    reducers: {
        setState(state: GlobalModelState, { payload }:any): GlobalModelState {
            return { ...state, ...payload };
        },
    },
};
