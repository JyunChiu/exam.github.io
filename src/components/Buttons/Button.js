import React from 'react';
import styled from 'styled-components';
import { COMMON_COLOR } from '~~styles/_variables';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  padding: 6px 12px;
  color: ${COMMON_COLOR.BLACK};
  border: 1px solid ${COMMON_COLOR.GRAY};
  background: ${COMMON_COLOR.WHITE};
  transition: 0.5s ease all;
  cursor: pointer;
  .icon {
    margin: 0 2px;
  }

  &.round {
    border-radius: 100px;
  }

  &.disabled {
    pointer-events: none;
    filter: grayscale(1);
  }

  &:hover{
    filter: brightness(0.9)
  }

  &:active{
    filter: brightness(0.8)
  }

`;

const Button = (props) => {
  const {
    children,
    className,
    onClick = () => { },
    disabled = false,
    round = false,
    ...restProps
  } = props;

  function getClassName() {
    let result = ['styleButton'];
    if (className) {
      result.push(className);
    }
    if (round) {
      result.push('round');
    }
    if (disabled) {
      result.push('disabled');
    }

    return result.join(' ');
  }

  return (
    <Div className={getClassName()} onClick={onClick} {...restProps}>
      {children}
    </Div>
  );
};

export default Button;
