import Axios from 'axios';
import * as config from '../config';
import MessageEnum from './msg.js';
Axios.defaults.baseURL = config.ROOT_API;
Axios.defaults.timeout = 10000;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Axios.defaults.withCredentials = true;

//请求方法类型
export enum MethodType {
	GET = 'get',
	POST = 'post',
}

export class ResponseBody {
	retCode: number = 0;
	data: any;
	msg: string = '请求成功';
	total?:number
}

interface HeaderObj {
	method: MethodType;
	url: string;
	params?: any;
	data?: any;

}

/**
 * 请求工具
 * @param {MethodType} type
 * @param {string}     url
 * @param {any}        params
 * @param {boolean}    isToast
 */
const _http = (type: MethodType, url: string, params: any, isToast: boolean): Promise<ResponseBody> => {
	type = type || MethodType.GET;
	if (!url) throw new Error('请指定url');
	const obj: HeaderObj = {
		method: MethodType.GET,
		url: '',
	};
	params = Object.prototype.toString.call(params) === '[object Object]' ? params : {};
	if (type === MethodType.GET) {
		obj.method = MethodType.GET;
		obj.url = url;
		obj.params = params;
	} else if (type === MethodType.POST) {
		obj.method = MethodType.POST;
		obj.url = url;
		obj.data = params;
	} else {
		throw new Error('请指定请求方式');
	}
	const instance = Axios.create();

	//当创建实例的时候，拦截器放在default无效
	instance.interceptors.request.use(
		(config: any) => {
			//不能使用null，否则会将token的值变成'null'
			config.headers['x-access-token'] = '';
			// store.dispatch(setLoading(true));
			return config;
		},
		error => {
			// store.dispatch(setLoading(false));
			// return Promise.reject(error);
		},
	);
	instance.interceptors.response.use(
		(response: any) => {
			// store.dispatch(setLoading(false));
			return response;
		},
		error => {
			// store.dispatch(setLoading(false));
			return Promise.reject(error);
		},
	);

	const __promise = new Promise((resolve: (value: ResponseBody) => void, reject: any) => {
		instance
			.request(obj)
			.then(
				res => {
					if (res.status == 200 && res.data.retCode !== 0) {
						if (res.data.retCode === 10006 || res.data.retCode === 10003) {
							// store.dispatch('delToken');
						}
						console.log(res);
						// isToast && store.dispatch(setToast(res.data.msg || '异常'));
						return false;
					}
					return resolve(res.data);
				},
				err => {
					// isToast && store.dispatch(setToast('异常'));
				},
			)
			.catch(e => {
				// isToast && store.dispatch(setToast('异常'));
			});
	});
	return __promise;
};
let a:(y:number)=>number = y=>y;
export default _http;
