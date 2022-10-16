import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';
import { BsX } from 'react-icons/bs';
import * as R from 'ramda';
import { COMMON_COLOR } from '~~styles/_variables';
import ClickOutside from '../ClickOutside';
import FieldWrapper from './FieldWrapper';
import Input from './Input'

const Div = styled(FieldWrapper)`
  cursor: pointer;

  .valueBox{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    cursor: auto;
    .mutiItem{
      display: flex;
      align-items: center;
      background: ${COMMON_COLOR.BLUE};
      color:  ${COMMON_COLOR.WHITE};
      font-size: 14px;
      padding: 1px 1px 1px 5px;
      border-radius: 4px;
      transition: 0.5s ease all;
      margin: 2px 0;
      &:not(:last-child){
        margin-right: 5px;
      }
     &:hover{
        transform: scale(0.98);
      }
     
      .iconRemove{
        font-size: 18px;
        cursor: pointer;
      }
    }
  }

  .valueBox[placeholder]:empty:before {
    content: attr(placeholder);
    color: ${COMMON_COLOR.GRAY}; 
  }

  .iconArrow.open{
    transform: rotate(180deg);
  }

  .searchBar{
    margin: 5px;
    width: calc(100% - 10px);
    border-color: ${COMMON_COLOR.GRAY}; 
    border-radius: 30px;
    padding: 5px 12px;
  }
`

const Select = (props) => {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [term, setTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([])
  const {
    name,
    value,
    options = [],
    className = '',
    onChange = () => { },
    placeholder = 'select',
    disabled = false,
    onBlur = () => { },
    hasSearchBar = false,
    isMulti = false,

  } = props;
  const triggerField = useRef(null);

  // console.log('Select :::', props)

  useEffect(() => {
    if (isMenuShow) return;
    setTerm('');
  }, [isMenuShow]);

  useEffect(() => {
    if (options.length === 0) return
    if (!term) {
      setFilteredOptions(options)
    } else {
      const opt = options.filter(item => item.label.indexOf(term) > -1)
      setFilteredOptions(opt)
    }
  }, [term, options])

  function handleClickOutside() {
    handleMenuShow(false);
    onBlur();
  }

  function handleMenuShow(status) {
    setIsMenuShow(status);
  }

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    handleMenuShow(!isMenuShow);
  }

  function getDisplayValue() {
    let result = ''

    if (isMulti) {
      result = value.map((item, index) => (
        <div className='mutiItem' key={item} onClick={e => e.stopPropagation()}>
          {getSelectedOptionLabel(item)}
          <BsX className='iconRemove' onClick={(e) => handleRemoveMultiItem(e, index)} />
        </div>
      ))
    } else {
      result = getSelectedOptionLabel(value)
    }

    return result
  }

  function handleRemoveMultiItem(e, index) {
    e.stopPropagation();
    const list = [...value]
    list.splice(index, 1)
    onChange({ [name]: list });
  }

  function getSelectedOptionLabel(val) {
    const obj = R.find(R.propEq('value', val))(options)
    return obj?.label ?? ''
  }

  function handleBlur() {
    console.log('handleBlur??')
    if (isMenuShow) return;
    onBlur();
  }

  function handleChange(val, e) {
    e.stopPropagation();
    e.preventDefault();
    let result = isMulti ? [...value, val] : val
    if (isMulti) {
      const list = [...value]
      const index = list.indexOf(val)
      if (index > -1) {
        list.splice(index, 1)
        result = list
      } else {
        result = [...list, val]
      }

    } else {
      result = val
    }
    onChange({ [name]: result });
    handleMenuShow(isMulti);
  }

  function handleTermChange(item) {
    setTerm(item.term)
  }

  function getOptionClass(val) {
    let condition = isMulti ? value.includes(val) : val === value;

    return condition ? 'item active' : 'item unSelected'
  }

  function getClassName() {
    let result = ['selectWrapper'];
    if (className) {
      result.push(className);
    }
    if (disabled) {
      result.push('disabled');
    }

    return result.join(' ');
  }

  return (
    <ClickOutside
      onClickOutside={handleClickOutside}
    >
      <Div
        ref={triggerField}
        className={getClassName()}
        onClick={handleClick}
        onBlur={handleBlur}
      >
        <div className='valueBox' placeholder={placeholder}>
          {value && options.length > 0 && getDisplayValue()}
        </div>
        {isMenuShow &&
          <div className='menuBox' onClick={e => e.stopPropagation()}>
            {
              hasSearchBar &&
              <Input
                name='term'
                value={term}
                onChange={handleTermChange}
                placeholder='search'
                className='searchBar'
              />
            }
            <div className='optionBox'>
              {
                filteredOptions.length > 0 ?
                  filteredOptions.map(item => (
                    <div
                      key={item.value}
                      className={getOptionClass(item.value)}
                      onClick={e => handleChange(item.value, e)}
                    >
                      {item.label}
                    </div>
                  )) : <div className='noOption'>No Option</div>
              }
            </div>
          </div>
        }

        <IoIosArrowDown className={isMenuShow ? 'functionBtn iconArrow open' : 'functionBtn iconArrow'} />
      </Div>
    </ClickOutside>
  )
};


export default Select