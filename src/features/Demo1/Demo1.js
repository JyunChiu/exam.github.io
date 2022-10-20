import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as R from 'ramda';
import { BsCodeSlash } from "react-icons/bs";
import { HomeResource } from '~~apis/resource';
import { Select } from '~~components/Fields';
import { Button } from '~~components/Buttons';
import { MdxModal } from '~~components/Modals';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5% 0%;
  .wrapper{
    display: flex;
    align-items: center;
    margin: 10px 0 0;
  }
  .clickOutsideBox {
    &:not(:last-child){
      margin: 0 10px 0 0
    }
    .selectWrapper{
      min-width: 260px;
      max-width: 600px;
      min-height: 46px;
    }
  }
`

const Demo1 = (props) => {
  const [dimension, setDimension] = useState('')
  const [dimensionOpts, setDimensionOpts] = useState([])
  const [elements, setElements] = useState([])
  const [elementsOpts, setElementsOpts] = useState([])
  const [isMdxOpen, setIsMdxOpen] = useState(false)
  const [mdxCode, setMdxCode] = useState('')

  useEffect(() => {
    getDimensions()
  }, [])

  function getDimensions() {
    HomeResource.getDimensions()
      .then(response => {
        // console.log('getDimensions response -----', response);
        const { data } = response
        const list = data.value.reduce((prev, curr) => {
          if (curr.Name.indexOf('}') === -1) {
            return [
              ...prev,
              {
                label: curr.Name,
                value: curr.Name,
                UniqueName: curr.UniqueName
              }
            ]
          }
          return prev
        }, [])
        setDimensionOpts(list)
      })
      .catch(error => {
        // console.log('error -----', error.response);
      });
  }

  function getElements(dimensionName, mdxList = null) {
    HomeResource.getElements(dimensionName)
      .then(async response => {
        // console.log('getElements response -----', response);
        const { data } = response
        const list = data.Elements.map(item => ({
          label: item.Name,
          value: item.Name,
          UniqueName: item.UniqueName
        }))
        setElementsOpts(list)
        if (mdxList) {
          handleMappingElement(list, mdxList)
        }
      })
      .catch(error => {
        // console.log('error -----', error.response);
      });
  }

  function handleDimensionsChange(item) {
    const dimensionName = item.dimension
    setDimension(dimensionName)
    setElements([])
    getElements(dimensionName)
  }

  function handleElementsChange(item) {
    setElements(item.elements)
  }

  function handleModalClick(status) {
    setIsMdxOpen(status)

    if (!status) return
    if (elements.length > 0) {
      const mdxList = elements.map(item => handleMappingMdxCode('value', item, elementsOpts, 'UniqueName'))
      setMdxCode(mdxList.join(',\n'))
    } else {
      const mdx = handleMappingMdxCode('value', dimension, dimensionOpts, 'UniqueName')
      setMdxCode(mdx)
    }
  }

  function handleMdxChange(val) {
    setMdxCode(val)
  }

  function handleMappingMdxCode(inputkey, val, list, outputkey) {
    const obj = R.find(R.propEq(inputkey, val))(list)
    return obj ? obj[outputkey] : ''
  }

  function handleMdxModalSave() {
    if (!mdxCode) {
      setDimension('')
      setElements([])
      return
    }

    const mdxList = mdxCode.split(/[ ,/\n]+/).filter(item => !!item)
    const dimensionName = handleMappingMdxCode('UniqueName', mdxList[0].split('.', 1)[0], dimensionOpts, 'value')
    setDimension(dimensionName)
    if (!dimensionName) {
      setElements([])
      return
    }

    getElements(dimensionName, mdxList)
  }

  function handleMappingElement(opts, mdxList) {
    let newElement = []
    mdxList.forEach(item => {
      const hasElement = item.split('.').length === 3
      if (!hasElement) return
      const elementName = handleMappingMdxCode('UniqueName', item, opts, 'value')
      if (newElement.includes(elementName) || !elementName) return
      newElement.push(elementName)
    })
    setElements(newElement)
  }

  return (
    <Div>
      <div className='wrapper'>
        <Select
          name='dimension'
          hasSearchBar
          placeholder='Dimension'
          value={dimension}
          options={dimensionOpts}
          onChange={handleDimensionsChange}
        />
        <Select
          name='elements'
          hasSearchBar
          placeholder='Element'
          isMulti
          value={elements}
          options={elementsOpts}
          onChange={handleElementsChange}
          disabled={!dimension}
        />
        <Button onClick={() => handleModalClick(true)}><BsCodeSlash /></Button>
      </div>
      <MdxModal
        isOpen={isMdxOpen}
        toggleClose={() => handleModalClick(false)}
        mdxCode={mdxCode}
        onChange={handleMdxChange}
        onSave={handleMdxModalSave}
      />
    </Div>
  );
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Demo1);
