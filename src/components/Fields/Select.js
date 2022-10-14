import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';
import * as R from 'ramda';
import { COMMON_COLOR } from '~~styles/_variables';
import ClickOutside from '../ClickOutside';
import FieldWrapper from './FieldWrapper';
import Input from './Input'

const Div = styled(FieldWrapper)`
  cursor: pointer;

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
  const [isMenuShow, setIsMenuShow] = useState(true);
  const [term, setTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([])
  const {
    name,
    value,
    options = [],
    className = 'selectWrapper',
    onChange = ()=>{},
    placeholder = 'select',
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

  useEffect(()=>{
    if(options.length === 0) return
    if(!term){
      setFilteredOptions(options)
    }else{
      const opt = options.filter(item=>item.label.indexOf(term) > -1)
      setFilteredOptions(opt)
    }
  },[term, options])

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
    console.log('handleBlur??')
    if (isMenuShow) return;
    onBlur();
  }

  function handleChange(val, e) {
    e.stopPropagation();
    e.preventDefault();
    onChange({ [name]: val });
    handleMenuShow(isMulti);
  }

  function handleTermChange(item){
    setTerm(item.term)
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
        {isMenuShow && 
          <div className='menuBox' onClick={e=> e.stopPropagation()}>
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
                filteredOptions.length > 0? 
                filteredOptions.map(item=>(
                  <div 
                    key={item.value}
                    className={item.value === value? 'item active':'item'}
                    onClick={e => handleChange(item.value, e)}
                  >
                    {item.label}
                  </div>
                )):<div className='noOption'>No Option</div>
              }
            </div>
          </div>
        }
        
        <IoIosArrowDown  className={isMenuShow? 'functionBtn iconArrow open' : 'functionBtn iconArrow'}/>
      </Div>
    </ClickOutside>
  )
};


export default Select