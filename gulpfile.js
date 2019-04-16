const gulp = require('gulp');
const { server, client } = require('electron-connect');
const electron = server.create();
let isStarted = false;
gulp.task('watch:electron', function () {

  	gulp.watch(['src/main/*.ts'], e=>{
  		console.log(app, 'dddddddd')
  		if(!isStarted && electron.numClients != 0){
  			
  			isStarted = true;
  		}

  		electron.reload();
  	});
});