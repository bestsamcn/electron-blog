import { autoUpdater } from 'electron-updater';
import { UPDATE_URL } from '../configs/config';



export const updator = {

	//renderer重写
	checkingUpdate(m:any){},

	//renderer重写
	updateAvailable(m:any){},

	//renderer重写
	updateNotAvailable(m:any){},

	//renderer重写
	downloadProgress(m:any){},

	//renderer重写
	updateDownloaded(event:any, releaseNotes:any, releaseName:any, releaseDate:any, updateUrl:any, quitAndUpdate:any){},

	//renderer重写
	onError(m:any){},

	//main覆盖
	updateNow(){},

	//供rederer使用
	doUpdate(){
		checkForUpdates();
	}
};




const checkForUpdates = ()=>{
	autoUpdater.setFeedURL(UPDATE_URL);

	// 下面是自动更新的整个生命周期所发生的事件
	autoUpdater.on('error', function(message:any) {
	    updator.onError!(message);
	});
	autoUpdater.on('checking-for-update', function(message:any) {
		updator.checkingUpdate!(message);
	});
	autoUpdater.on('update-available', function(message:any) {
		updator.updateAvailable!(message);
	});
	autoUpdater.on('update-not-available', function(message:any) {
		updator.updateNotAvailable!(message);
	});

	// 更新下载进度事件
	autoUpdater.on('download-progress', function(progressObj:any) {
		updator.downloadProgress!(progressObj);
	});
	// 更新下载完成事件
	autoUpdater.on('update-downloaded', function(event:any, releaseNotes:any, releaseName:any, releaseDate:any, updateUrl:any, quitAndUpdate:any) {
		updator.updateDownloaded!(event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate);
	    updator.updateNow =() => {
	        autoUpdater.quitAndInstall();
	    };
	});
	autoUpdater.checkForUpdates();
}


