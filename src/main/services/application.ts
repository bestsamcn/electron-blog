import { create, getPath } from './window';
import { client } from 'electron-connect';

export function init() {
  	const win = create({ width: 800, height: 600 });
  	win.loadURL(getPath());
  	
   	// Connect to server process
  	client.create(win);
}
