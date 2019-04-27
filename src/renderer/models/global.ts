import { ResponseBody } from '@/utils/request';
import { getCategoryList } from '@/services';
import $$ from '@/utils';
import { ipcRenderer } from 'electron';

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
    articleParams:any,
    isUpdateAvailable:boolean
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
	    articleParams:{category: "前端", tag: "", isFromHome: true},
	    isUpdateAvailable:false,
	    updateError:false,
	    updateProgress:0

    },
    subscriptions: {
        init({ dispatch, history }:any) {
            dispatch({ type: 'getCategoryList', params: {} });
            dispatch({ type: 'setMobile', params: {} });
            dispatch({ type: 'checkUpdate' });
        },
    },
    effects: {

    	* checkUpdate({}, {put, call, select}:any){
    		let { isUpdateAvailable } = yield select((state:any)=>state.global);

    		ipcRenderer.on('updateAvailable', (msg:any)=>{
    			console.log(msg, 'updateAvailable')
    			window.g_app._store.dispatch({type:"global/setState", payload:{isUpdateAvailable:true}});
    		});

    		ipcRenderer.on('updateNotAvailable', (msg:any)=>{
    			// console.log(msg, 'updateNotAvailable')
    			window.g_app._store.dispatch({type:"global/setState", payload:{isUpdateAvailable:false}});
    			window.g_app._store.dispatch({type:"global/setToast", params:{msg:'已是最新应用版本'}});
    		});

    		ipcRenderer.on('downloadProgress', (msg:any)=>{
    			console.log(msg, 'downloadProgress')
    			!isUpdateAvailable && window.g_app._store.dispatch({type:"global/setState", payload:{isUpdateAvailable:true}});
    			window.g_app._store.dispatch({type:"global/setToast", params:{msg:'更新中...'}});

    		});

    		ipcRenderer.on('onError', (msg:any)=>{
    			console.log(msg, 'onError')
    			window.g_app._store.dispatch({type:"global/setToast", params:{msg:'更新异常'}});
    			window.g_app._store.dispatch({type:"global/setState", payload:{updateError:true}});
    		});

    		ipcRenderer.on('updateDownloaded', (msg:any)=>{
    			console.log(msg, 'onError')
    			window.g_app._store.dispatch({type:"global/setToast", params:{msg:'更新完成，即将重启'}});
    			window.g_app._store.dispatch({type:"global/setState", payload:{isUpdateAvailable:false}});
    		});
    	},

    	//loading状态
    	* setLoading({ params:{isLoading} }:{params:any}, { put, call }:any) {
            yield put({type:'setState', payload:{isLoading}});
        },

        //提示状态
    	* setToast({ params:{msg} }:{params:any}, { put, call }:any) {
            yield put({type:'setState', payload:{msg}});
            setTimeout(()=>{
            	window.g_app._store.dispatch({type:'global/setToast', params:{msg:''}});
            }, 2000)
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
