import { Menu } from 'electron';
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
	];
}

export function init(updator?:any) {
	log.info('(menu) init');
	const menu = Menu.buildFromTemplate(getTemplate(updator));
	Menu.setApplicationMenu(menu);
	// Menu.setApplicationMenu(null);
}
