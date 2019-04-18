import { create, getPath } from './window';

export function init() {
  	const win = create({ width: 1200, height: 600 });
  	win.loadURL(getPath());
}
