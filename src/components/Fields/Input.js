import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { BsX } from 'react-icons/bs';
import { COMMON_COLOR } from '~~styles/_variables';
import FieldWrapper from './FieldWrapper';

const Div = styled(FieldWrapper)`
  .valueBox{
    padding: 0;
    color: inherit;
    font-size: inherit;
    letter-spacing: inherit;
    ::placeholder {
      color: ${COMMON_COLOR.GRAY};
      letter-spacing: 1px;
    }
    &:disabled {
      background: none;
      color: #858585;
      -webkit-text-fill-color: #858585;
      opacity: 1;
    }
    &:-webkit-autofill {
      -webkit-text-fill-color: ${COMMON_COLOR.BLACK};
    }
    &:-internal-autofill-selected {
      box-shadow: inset 0px 0px 0px 30px white;
    }
  }

  
`

const Input = (props) => {
  const {
    name,
    type = 'text',
    value,
    className = '',
    onChange = () => { },
    placeholder = '',
    disabled = false,
    onFocus = () => { },
    onBlur = () => { },

  } = props;
  const triggerField = useRef(null);

  // console.log('Input :::', props)

  function handleFocus() {
    onFocus(name);
  }

  function handleBlur() {
    onBlur();
  }

  function handleChange(e) {
    const key = e.target.name;
    const val = e.target.value;
    onChange({ [key]: val });
  }

  function handleRemove(e) {
    e.preventDefault();
    onChange({ [name]: '' });
  }


  function handleKeyPress(e) {
    const { key } = e;
    if (key === 'Enter') {
      triggerField.current.blur();
    }
  }

  function getClassName() {
    let result = ['inputWrapper'];
    if (className) {
      result.push(className);
    }
    if (disabled) {
      result.push('disabled');
    }

    return result.join(' ');
  }

  return (
    <Div
      ref={triggerField}
      className={getClassName()}
      onClick={e => e.stopPropagation()}
    >
      <input
        id={`input--${name}`}
        ref={triggerField}
        name={name}
        value={value}
        type={type}
        className="valueBox"
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
      />
      {value && <BsX className='functionBtn' onMouseDown={handleRemove} />}
    </Div>
  )
};


export default Input