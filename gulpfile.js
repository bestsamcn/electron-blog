var gulp = require('gulp');
var electron = require('electron-connect').server.create();

gulp.task('watch:electron', function () {
  	electron.start();
  	gulp.watch(['src/main/*.ts'], e=>{
  		console.log('electron reload')
  		electron.reload();
  	});
});