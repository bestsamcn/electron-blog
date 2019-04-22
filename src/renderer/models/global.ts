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

        //切换移动端菜单状态
        *setToggleMenu({ params }:{params:any}, { put, call, select }:any){
            let { iShowMenu } = yield select((state:any)=>state.global);
            yield put({type:'setState', payload:{iShowMenu:!iShowMenu}});
        }
    },
    reducers: {
        setState(state: GlobalModelState, { payload }:any): GlobalModelState {
            return { ...state, ...payload };
        },
    },
};
