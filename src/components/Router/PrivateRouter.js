import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as R from 'ramda';
import { SIDE_KEY } from '~~features/consts';

const PrivateRouter = (props) => {
  const { component: Component, adminInfo, memberInfo, sideKey, ...restProps } = props;
  const isAdmin = R.isEmpty(adminInfo);
  const isEmployee = R.isEmpty(memberInfo);

  function getPath() {
    let path = '/login';
    if (sideKey === SIDE_KEY[1]) {
      path = '/management/login';
    }
    return path;
  }

  return (
    <Route
      {...restProps}
      render={(renderProps) => {
        return (
          isAdmin || isEmployee
            ? <Component {...renderProps} />
            : (
              <Redirect
                to={{
                  pathname: getPath(),
                  state: { fromPath: renderProps.location }
                }}
              />
            )
        );
      }}
    />
  );
};

PrivateRouter.defaultProps = {
};

const mapStateToProps = (state) => ({
  sideKey: state.common.sideKey,
  adminInfo: state.common.adminInfo,
  memberInfo: state.common.memberInfo,
});

const mapDispatchToProps = {

};

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
))(PrivateRouter);
