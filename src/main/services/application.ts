import { create, getPath } from './window';
import { screen } from 'electron';



export function init() {
	let display = screen.getPrimaryDisplay();//可以获取界面信息
  	const win = create({ width: 1200, height: 600 , webPreferences:{zoomFactor:1} });
  	win.loadURL(getPath());
  	
}
