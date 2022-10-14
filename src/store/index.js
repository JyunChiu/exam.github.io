import { createHashHistory as createHistory } from 'history';
// import { createBrowserHistory as createHistory } from 'history';
import configureStore from './configureStore';

// HashHistory
export const history = createHistory({});
// BrowserHistory
// export const history = createHistory();
export const store = configureStore(history, {});
