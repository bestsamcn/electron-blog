import is from 'electron-is';
import { join } from 'path';
import { BrowserWindow } from 'electron';

let count = 0;

export function create(opts) {
  count += 1;
  let win = new BrowserWindow(opts);
  win.on('close', () => {
    count -= 1;
    win = null;
  });

  //强制开启调试模式
  // win.webContents.openDevTools({mode:'right'});
  return win;
}

export function getCount() {
  return count;
}

export function getPath() {
  let path = `file://${join($dirname, '..', 'renderer')}/index.html`;
  if (is.dev()) {
    path = 'http://127.0.0.1:8000/';
  }
  return path;
}

export function test(){
  return 'test'
}
