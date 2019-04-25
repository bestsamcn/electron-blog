import { join } from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const cwd = process.cwd();

export default function(webpackConfig, {webpack}) {

    //删除progress plugin
    webpackConfig.plugins.splice(webpackConfig.plugins.length - 1, 1);
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

        //手动设置左上角图标
        new CopyWebpackPlugin([{
        	from:'./src/main/icons/icon.ico',
         	to:'./icons',
         	ignore: ['*.ts'],
        }])
    );
    return webpackConfig;
}
;