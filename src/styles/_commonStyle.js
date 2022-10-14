import React from 'react';
import styled, { css } from 'styled-components';

const SmallSrcollBar = (width = 3) => {
  return css`
    ::-webkit-scrollbar { 
      width: ${width}px;
      background: none;
      box-shadow: none;
    }
  `;
}


export {
  SmallSrcollBar,
};
