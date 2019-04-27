import is from 'electron-is';
import { join } from 'path';
import { BrowserWindow, shell } from 'electron';
import { Updator } from './updator';

let count = 0;

export function create(opts: any) {
    count += 1;
    let win: any = new BrowserWindow(opts);
    win.on('close', () => {
        count -= 1;
        win = null;
    });

    //强制开启调试模式
    win.webContents.openDevTools({ mode: 'right' });
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

/**
 * 使用默认浏览器打开url
 * @param {string} url
 */
export function openUrlExternal(url: string) {
    return shell.openExternal(url);
}
