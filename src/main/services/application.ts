import { create, getPath } from './window';
import { screen } from 'electron';



export function init() {
	let display = screen.getPrimaryDisplay();
	console.log(display, 'sdfasdf')
  	const win = create({ width: 1200, height: 600 , webPreferences:{zoomFactor:display.scaleFactor} });
  	win.loadURL(getPath());
}
