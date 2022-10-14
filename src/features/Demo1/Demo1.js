import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { HomeResource } from '~~apis/resource';
import { Select } from '~~components/Fields'

const Div = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 5% 0%;
  .selectWrapper{
    min-width: 260px;
  }
`

const Demo1 = (props) => {
  const [ selectedValue, setSelectedValue ] = useState('')
  const [ options, setOptions ] =  useState([])

  useEffect(()=>{
    HomeResource.testApi()
    .then(response => {
      // console.log('response -----', response); 
      const { data } = response
      const list = data.value.reduce((prev, curr)=>{
        if(curr.Name.indexOf('}') === -1){
          return [...prev, {label:curr.Name, value:curr.UniqueName}]
        }
        return prev
      }, [])
      setSelectedValue(list[0].value)
      setOptions(list)
    })
    .catch(error => {
      // console.log('error -----', error.response);
    });
  }, [])

  function handleSelectChange(item){
    setSelectedValue(item.data)
  }

  return (
    <Div>
      <Select
        name='data'
        hasSearchBar
        value={selectedValue}
        options={options}
        onChange={handleSelectChange}
      />
    </Div>
  );
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Demo1);
