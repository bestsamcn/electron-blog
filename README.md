# electron-blog

## 简介
Electron-Blog 是一个基于``electron+umi+dva+typescript``等技术开发的桌面端项目,另有[Vue版本](https://github.com/bestsamcn/vue-blog), [Angualr版本](https://github.com/bestsamcn/angular-blog), [React版本](https://github.com/bestsamcn/react-blog)。

- 后端接口利用 ``express + mongodb + redis`` 开发，后端地址[请点我](https://github.com/bestsamcn/node-blog)

![default](https://github.com/bestsamcn/electron-blog/blob/master/screenshots/preview.png)

### 环境

1. 全局安装electron(或许在项目中安装比较好)
	```
	npm install electron -g
	```
	若是全局安装后，找不到模块，可以使用`npm link electron`映射, 一个问题electron全局安装，可能出现某些接口异常

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

## 预览
- 项目总体完成，部分细节有待修改。
- [请点击我](http://blog.bestsamcn.me/)预览vue版本
- [请点击我](http://react.bestsamcn.me/)预览react版本
- [请点击我](http://angular.bestsamcn.me/)预览angular版本
- [请点击我](http://gulp.bestsamcn.me/)预览gulp自动化版本


### 最后
初始化时可能会出现某些模块无法引用的情况，重新安装即可