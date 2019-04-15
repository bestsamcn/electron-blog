import { join } from 'path';

const cwd = process.cwd();

export default function (webpackConfig, { webpack }) {

  for(let plugin of webpackConfig.plugins){
    if(plugin instanceof webpack.ProgressPlugin){
      webpackConfig.plugins.splice(webpackConfig.plugins.indexOf(plugin), 1);
    }
  }
  webpackConfig.entry = {
    main: './src/main/index.ts',
  };
  webpackConfig.output.path = join(cwd, './app/dist/main');
  webpackConfig.target = 'electron';
  webpackConfig.externals = (context, request, callback) => {
    callback(null, request.charAt(0) === '.' ? false : `require("${request}")`);
  };

  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      $dirname: '__dirname',
    }),
  );
  return webpackConfig;
};
