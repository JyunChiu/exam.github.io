import { css } from 'styled-components';

const COMMON_COLOR = {
  BLACK: '#5F5F5F',
  GRAY: '#bababa'
};

// rwd 相關 --------------------------------------------------------------------
const breakpoints = {
  desktop_2100: '2100px',
  desktop_1800: '1800px',
  laptop_1440: '1440px',
  laptop_1370: '1370px',
  laptop_1280: '1280px',
  tablet_1024: '1024px',
  tablet_880: '880px',
  mobile_500: '500px',
  mobile_450: '450px',
  mobile_390: '390px',
};

const respondSmallerThan = Object.keys(breakpoints).reduce(
  (accumulator, label) => {
    accumulator[label] = (...args) => css`
      @media (max-width: ${breakpoints[label]}) {
        ${css(...args)};
      }
    `;
    return accumulator;
  },
  {}
);

const respondBiggerThan = Object.keys(breakpoints).reduce(
  (accumulator, label) => {
    accumulator[label] = (...args) => css`
      @media screen and (min-width: ${breakpoints[label]}) {
        ${css(...args)};
      }
    `;
    return accumulator;
  },
  {}
);

export {
  COMMON_COLOR,
  respondSmallerThan,
  respondBiggerThan
};

