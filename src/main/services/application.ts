import { create, getPath } from './window';
import { screen } from 'electron';
import path from 'path';

export function init() {
	let display = screen.getPrimaryDisplay(); //可以获取界面信息
	const win = create({ 
		width: 1300, 
		height: 700, 
		minWidth: 1300, 
		minHeight: 700, 
		icon: path.join($dirname, 'icons', 'icon.ico')
	});
	win.loadURL(getPath());
}
