import Config from 'electron-config';
import is from 'electron-is';
export const UPDATE_URL = is.dev() ? 'http://localhost:4000/electron' : 'http://localhost:4000/electron';


export default new Config({ name: 'config' });
