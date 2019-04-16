# electron-blog
Electron-blog是利用electron, umi, dva, typescript等技术开发的桌面端项目


### 环境



1. 全局安装electron
	```
	npm install electron -g
	```
	若是全局安装后，找不到模块，可以使用`npm link electron`映射

2. 根目录安装依赖
	```
	npm install
	```

3. cd到app目录安装依赖
	```
	npm install
	```



### 开发
1. 运行开发环境，以下命令会分别原型umi和打包electron的ts代码到`app/dist`
	```
	npm run dev
	```
2. 启动electron开发环境
	```
	npm run start:electron
	```

### 打包
```
npm run pack
```



### 最后
初始化时可能会出现某些模块无法引用的情况，重新安装即可