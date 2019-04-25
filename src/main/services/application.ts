import { create, getPath } from './window';
import { screen } from 'electron';



export function init() {
	let display = screen.getPrimaryDisplay();//可以获取界面信息
  	const win = create({ width: 1000, height: 700 , minWidth:1000, minHeight:700, webPreferences:{zoomFactor:1} });
  	win.loadURL(getPath());
}
