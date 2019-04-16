import { create, getPath } from './window';
// import { server, client } from 'electron-connect';

export function init() {
  	const win = create({ width: 800, height: 600 });
  	win.loadURL(getPath());
  	

   	// client.create(win);

}
