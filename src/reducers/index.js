import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import common from '~~redux/CommonReducer';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  common,
});

export default rootReducer;
