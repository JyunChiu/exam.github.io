import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';
import * as R from 'ramda';
import { COMMON_COLOR } from '~~styles/_variables';
import ClickOutside from '../ClickOutside';
import FieldWrapper from './FieldWrapper';

const Div = styled(FieldWrapper)`
  cursor: pointer;

  .valueBox[placeholder]:empty:before {
    content: attr(placeholder);
    color: ${COMMON_COLOR.GRAY}; 
  }

  .iconArrow.open{
    transform: rotate(180deg);
  }
`

const Select = (props) => {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [term, setTerm] = useState('');
  const {
    name,
    value,
    options = [],
    className = 'selectWrapper',
    onChange = ()=>{},
    placeholder = '請選擇',
    disabled = false,
    onBlur = ()=>{},
    hasSearchBar = false,
    isMulti = false,

  } = props;
  const triggerField = useRef(null);

  // console.log('Select :::', props)

  useEffect(() => {
    if (isMenuShow) return;
    setTerm('');
  }, [isMenuShow]);

  function handleClickOutside() {
    handleMenuShow(false);
    onBlur();
  }

  function handleMenuShow(status) {
    setIsMenuShow(status);
  }

  function handleClick(e) {
    handleMenuShow(!isMenuShow);
    e.preventDefault();
    e.stopPropagation();
  }

  function getDisplayValue(){
    let result = ''

    if(isMulti){

    }else{
      const obj = R.find(R.propEq('value', value))(options)
      result = obj?.label?? ''
    }

    return result
  }

  function handleBlur() {
    if (isMenuShow) return;
    onBlur();
  }

  function handleChange(val, e) {
    // console.log(name, '>> handleChange')
    e.stopPropagation();
    e.preventDefault();
    onChange({fieldName: name, value: val});
    handleMenuShow(isMulti);
  }

  return (
    <ClickOutside
      onClickOutside={handleClickOutside}
    >
      <Div
        ref={triggerField}
        className={className}
        onClick={handleClick}
        onBlur={handleBlur}
      >
        <div className='valueBox' placeholder={placeholder}>
         {value && options.length>0 && getDisplayValue()}
        </div>

        {
          isMenuShow && 
            <div className='menuBox'>
              {
                options.length > 0? 
                options.map(item=>(
                  <div 
                    key={item.value}
                    className={item.value === value? 'item active':'item'}
                    onClick={e => handleChange(item.value, e)}
                  >
                    {item.label}
                  </div>
                )):<div className='item noOption'>No Option</div>
              }
            </div>
        }

        <IoIosArrowDown  className={isMenuShow? 'functionBtn iconArrow open' : 'functionBtn iconArrow'}/>
      </Div>
    </ClickOutside>
  )
};


export default Select