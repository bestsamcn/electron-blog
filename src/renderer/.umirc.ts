import { IConfig } from 'umi-types';

declare function join(a: any, b: any, c: any);
declare function slash(a: any);
const config: IConfig = {
	disableDynamicImport: true,

	//electron使用相对路径
	publicPath: './',
	outputPath: '../../app/dist/renderer',
	treeShaking: true,
	history: 'hash',
	plugins: [
		[
			'umi-plugin-react',
			{
				antd: false,
				dva: true,
				dynamicImport: {
					webpackChunkName: true,
				},
				// dynamicImport:false,
				title: 'electron-blog',
				dll: true,
				locale: {
					enable: false,
					default: 'en-US',
				},
				routes: {
					exclude: [/models\//, /services\//, /model\.(t|j)sx?$/, /service\.(t|j)sx?$/, /components\//],
				},
			},
		],
	],
	externals(context, request, callback) {
		const isDev = process.env.NODE_ENV === 'development';
		let isExternal: boolean | string = false;
		const load = ['electron', 'electron-updater', 'fs', 'path', 'os', 'url', 'child_process'];

		//浏览器预览会报错require not defined
		if (load.includes(request)) {
			isExternal = `require("${request}")`;
		}

		//移除electron相关依赖到主线程中的dependencies
		const appDeps = Object.keys(require('../../app/package').dependencies);
		if (appDeps.includes(request)) {
			const orininalPath = slash(join(__dirname, '../../app/node_modules', request));
			const requireAbsolute = `require('${orininalPath}')`;
			isExternal = isDev ? requireAbsolute : `require('${request}')`;
		}
		callback(null, isExternal);
	},
	chainWebpack(config) {
		config.module
			.rule('less-loader')
			.test(/\.less$/)
			.use('less-loader')
			.loader(require.resolve('less-loader'));
	},
};

export default config;
