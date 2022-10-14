import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import loadable from '@loadable/component';
import App from '~~features/App';

// 代替indexRoute的方式 http://stackoverflow.com/questions/42254929/how-to-nest-routes-in-react-router-v4
const Routes = (props) => {
  return (
    <App>
      <Switch>
        <Route
          exact
          path="/demo1"
          component={loadable(() => import(/* webpackChunkName: "Demo1" */ '../features/Demo1'))}
        />
      </Switch>
    </App>
  );
};

export default Routes;
