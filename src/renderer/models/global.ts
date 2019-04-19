import { ResponseBody } from '@/utils/request';
import { getCategoryList } from '@/services';

class GlobalModelState {
    token: string;
}

export default {
    state: {
        token: '',
    },
    subscriptions: {
        init({ dispatch, history }) {
            dispatch({ type: 'getCategoryList', params: {} });
        },
    },
    effects: {
        *getCategoryList({ params }, { put, call }): void {
            console.log('asdfasdf');
            let res: ResponseBody;
            res = yield call(getCategoryList, {});
            console.log(res);
        },
    },
    reducers: {
        setState(state: GlobalModelState, { payload }): GlobalModelState {
            return { ...state, ...payload };
        },
    },
};
