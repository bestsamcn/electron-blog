import Config from 'electron-config';
import is from 'electron-is';
export const UPDATE_URL = is.dev() ? 'http://localhost:4000/electron' : 'http://electron.bestsamcn.me';


export default new Config({ name: 'config' });
