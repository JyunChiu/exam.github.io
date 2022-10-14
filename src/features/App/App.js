import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { useLocation } from 'react-router-dom';
import * as CommonActions from '~~redux/CommonActions';

const Div = styled.div`
  padding: 10px 0%;
  display: flex;
  justify-content: center;
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
