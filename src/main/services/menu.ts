import { Menu, screen, BrowserWindow } from 'electron';
import path from 'path';
import log from 'electron-log';


function getTemplate(updator?:any) {
	return [
		{
			label: '返回',
			click(menu:any, window:any){
				let code = `window.history.go(-1)`;
    			window.webContents.executeJavaScript(code);
			}
		},
		{
			label: '前进',
			click(menu:any, window:any){
				let code = `window.history.forward()`;
    			window.webContents.executeJavaScript(code);
			}
		},
		{
			label: '刷新',
			role: 'reload',
		},
		{
			label: '更新',
			click(){
				updator!.doUpdate(false);
			},
		},
		{
			label: '新窗口',
			click(){
				let display = screen.getPrimaryDisplay(); //可以获取界面信息
				const win =new BrowserWindow({ 
					width: 1300, 
					height: 700, 
					minWidth: 1300, 
					minHeight: 700, 
					icon: path.join($dirname, 'icons', 'icon.ico')
				});
				win.loadURL('http://127.0.0.1:8000/');
				return win;
			},
		},
	];
}

export function init(updator?:any) {
	log.info('(menu) init');
	const menu = Menu.buildFromTemplate(getTemplate(updator));
	Menu.setApplicationMenu(menu);
	// Menu.setApplicationMenu(null);
}
