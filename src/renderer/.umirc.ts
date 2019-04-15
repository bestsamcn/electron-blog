import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig =  {
  // publicPath: './static/',
  outputPath: '../../app/dist/renderer',
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'electron-blog',
      dll: true,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  externals(context, request, callback) {
    const isDev = process.env.NODE_ENV === 'development';
    let isExternal = false;
    const load = [
      'electron',
      'fs',
      'path',
      'os',
      'url',
      'child_process'
    ];

    //require not defined
    // if (load.includes(request)) {
    //   isExternal = `require("${request}")`;
    // }
    // const appDeps = Object.keys(require('../../app/package').dependencies);
    // if (appDeps.includes(request)) {
    //   const orininalPath = slash(join(__dirname, '../../app/node_modules', request));
    //   const requireAbsolute = `require('${orininalPath}')`;
    //   isExternal = isDev ? requireAbsolute : `require('${request}')`;
    // }
    callback(null, isExternal);
  },
}

export default config;
