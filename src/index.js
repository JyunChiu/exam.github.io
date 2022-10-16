import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  // BrowserRouter as Router
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from './store';
import Routes from './routes/routes';
import './styles/main.scss';
import 'bootstrap/dist/css/bootstrap.css';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router>
        <Routes />
      </Router>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<App />, document.querySelector('#root'));
