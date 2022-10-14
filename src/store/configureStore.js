import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import reducers from '../reducers';
import middlewares from '../middlewares';

export default function configureStore(history, preloadedState = {}) {
  // Build the middleware for intercepting and dispatching navigation actions
  const routerMiddleware = createRouterMiddleware(history);
  let composeEnhancers = compose;
  if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  const enhancers = composeEnhancers(applyMiddleware(middlewares.reduxThunkMiddleware, routerMiddleware));
  const store = createStore(
    reducers(history),
    preloadedState,
    enhancers
  );

  return store;
}
