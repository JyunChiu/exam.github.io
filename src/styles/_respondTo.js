import { css } from 'styled-components';
import { breakpoints } from './_variables';

export const respondSmallerThan = Object.keys(breakpoints).reduce(
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

export const respondBiggerThan = Object.keys(breakpoints).reduce(
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

// https://tobbelindstrom.com/blog/how-to-create-a-breakpoint-mixin-with-styled-components/

export default {
  respondSmallerThan,
  respondBiggerThan,
};
