import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { useLocation } from 'react-router-dom';
import * as CommonActions from '~~redux/CommonActions';

const Div = styled.div`
  >div{
    width: 100%;
    min-height: 100vh;
  }
`;

const App = (props) => {
  return (
    <Div>
      {props.children}
    </Div>
  );
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);
