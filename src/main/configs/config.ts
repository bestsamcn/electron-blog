import Config from 'electron-config';
import is from 'electron-is';
export const UPDATE_URL = is.dev() ? 'http://10.0.1.143:4000/electron' : 'http://10.0.1.143:4000/electron';


export default new Config({ name: 'config' });
