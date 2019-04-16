# electron-blog
Electron-blog


### 环境

全局安装electron
```
npm install electron -g
```
若是全局安装后，找不到模块，可以使用`npm link electron`映射

### 运行
1. 运行开发环境，以下命令会分别原型umi和打包electron的ts代码到`app/dist`
	```
	npm run dev
	```
2. 启动electron开发环境
	```
	npm run start:electron
	```