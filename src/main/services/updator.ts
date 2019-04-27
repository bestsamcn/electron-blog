import { autoUpdater } from 'electron-updater';
import { UPDATE_URL } from '../configs/config';
import { dialog, BrowserWindow, ipcMain } from 'electron';

// 主进程主动发送消息给渲染进程函数
export const updator = {
	win:null,

	init:(win:any)=>{
		updator.win = win;
		updator.doUpdate(true);
	},

	sendMessage:(type:string, data:any) {
	    (updator.win as any).webContents.send(type, data);
	},

	checkingUpdate:(m:any)=>{
		updator.sendMessage('checkingUpdate', m);
	},

	updateAvailable:(m:any)=>{
		updator.sendMessage('updateAvailable', m);
	},

	updateNotAvailable:(m:any)=>{
		updator.sendMessage('updateNotAvailable', m);
	},

	downloadProgress:(m:any)=>{
		updator.sendMessage('downloadProgress', m);
	},

	updateDownloaded:(event:any, releaseNotes:any, releaseName:any, releaseDate:any, updateUrl:any, quitAndUpdate:any)=>{
		updator.sendMessage('updateDownloaded', {event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate});
	},

	//renderer重写
	onError:(m:any)=>{
		updator.sendMessage('onError', m);
	},

	//供rederer使用
	doUpdate:(isAuto:boolean)=>{
		updator.checkForUpdates(isAuto);
	},
	checkForUpdates:(isAuto:boolean)=>{
		
		autoUpdater.setFeedURL(UPDATE_URL);

		//下面是自动更新的整个生命周期所发生的事件
		autoUpdater.on('error', (message:any)=>{
			console.log(message, 'update error');
			isAuto && dialog.showMessageBox(updator.win, {
				type:'error',
				title:'更新提示',
				message:'更新异常，请联系管理员处理'
			});
		    updator.onError!(message);
		});
		autoUpdater.on('checking-for-update', (message:any)=>{
			console.log(message, 'checking-for-update');
			updator.checkingUpdate!(message);
		});
		autoUpdater.on('update-available', (message:any)=>{
			console.log(message, 'update-available');
			updator.updateAvailable!(message);
		});
		autoUpdater.on('update-not-available', (message:any)=>{
			console.log(message, 'update-not-available');
			updator.updateNotAvailable!(message);
		});

		// 更新下载进度事件
		autoUpdater.on('download-progress', (progressObj:any)=>{
			console.log(progressObj, 'download-progress');
			updator.downloadProgress!(progressObj);
		});

		// 更新下载完成事件
		autoUpdater.on('update-downloaded', (event:any, releaseNotes:any, releaseName:any, releaseDate:any, updateUrl:any, quitAndUpdate:any)=>{
			console.log(releaseNotes, 'update-downloaded');
			updator.updateDownloaded!(event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate);

			//自动更新
		    setTimeout(()=>autoUpdater.quitAndInstall(), 2000);

		});
		autoUpdater.checkForUpdates();
	}
}


