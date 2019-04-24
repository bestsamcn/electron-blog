import { ResponseBody } from '@/utils/request';
import { addMessage} from '@/services';
import $$ from '@/utils';


export default {
	namespace:'message',
    state: {
    },
    subscriptions: {
        init({ dispatch, history }:any) {
        },
    },
    effects: {

        //获取不同类型文章数据
        * postMessage({ params }:{params:any}, { put, call, select }:any) { 
	        let res = yield call(addMessage, {...params});
	        params.callback && params.callback();
        }
    },
    reducers: {
        setState(state: any, { payload }:any){
            return { ...state, ...payload };
        }
    }
}