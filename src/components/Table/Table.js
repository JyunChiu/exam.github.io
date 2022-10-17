import React, { useEffect, useRef, useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { TableCell } from './TableStyle';
import * as R from 'ramda'

const SORTORDER = {
  DESC: 'descend',
  ASC: 'ascend'
}

const Table = (props) => {
  const { 
    showGutter = false,
    columns = [], 
    dataSource = [], 
    onRow = () => {},
  } = props;
  const [ data, setData ] = useState(dataSource);
  const [ sortInfo, setSortInfo] = useState([]);

  useEffect(()=>{
    setData(dataSource)
  }, [dataSource])

  useEffect(()=>{
    if(sortInfo.length===0) {
      setData(dataSource)
      return 
    }

    const conditions = sortInfo.map(item=>(R[item.order](R.prop(item.column))))
    const sorted = R.sortWith(conditions)(dataSource)
    setData(sorted)
  }, [JSON.stringify(sortInfo)])


  function handleRowClick(e, record) {
    e.stopPropagation();
    onRow(record);
  }

  function handleClickCell(e, onCell, record) {
    e.stopPropagation();
    onCell(record);
    // console.log('??', e.detail)
  }

  function getCellClassName(item) {
    let result = ['tableCell'];
    if (item.className) {
      result.push(item.className);
    }
    if (item.freeze) {
      result.push('freeze');
    }
    if (item.children?.length > 0) {
      result.push('hasChildren');
    }
    if (item.sortable) {
      result.push('sortable');
    }

    return result.join(' ');
  }

  function getPosition(id) {
    const index = Number(id.split('--')[1])
    const position = [...Array(index).keys()].reduce((prev, curr) => {
      const elem = document.getElementById(`${id.split('--')[0]}--${curr + 1}`);
      return prev + (elem?.offsetWidth ?? 0)
    }, 0)

    return position
  }

  function handleColumnSort(column){
    const index = R.findIndex(R.propEq('column', column))(sortInfo);
    let infoList = [...sortInfo]

    if(index === -1){
      setSortInfo(prev=>([...prev, { column, order:SORTORDER.DESC }]))
    }else{
      let newOrder 
      switch(sortInfo[index].order){
        case '':
          newOrder = SORTORDER.DESC
          infoList[index] = { column, order: newOrder }
          break;
        case SORTORDER.DESC:
          newOrder = SORTORDER.ASC
          infoList[index] = { column, order: newOrder }
          break;
        case SORTORDER.ASC:
          newOrder = '';
          infoList.splice(index, 1)
          break;
        default:
          break;
      }
      setSortInfo(infoList)
    }
  }

  function getSortIcon(dataIndex){
    const obj = handleFindSortItem(dataIndex)
    if(!obj) return 

    switch(obj.order){
      case SORTORDER.DESC:
        return <IoMdArrowDropdown className='iconSort' />
      case SORTORDER.ASC:
        return <IoMdArrowDropup className='iconSort' />
      default:
        return
    }
  }

  function handleFindSortItem(dataIndex){
    return R.find(R.propEq('column', dataIndex))(sortInfo)
  }

  function getTableCell(item, index, key, props){
    return(
      <TableCell
        key={`table-${key}--${item.dataIndex}--${index + 1}`}
        id={`table-${key}--${index + 1}`}
        className={getCellClassName(item)}
        width={item.width}
        align={item.align}
        position={item.freeze ? getPosition(`table-${key}--${index}`) : ''}
        {...props}
      >
       {props.children}
      </TableCell>
    )
  }

  return (
    <>
      {data.length > 0 ? (
        <table>
          <thead className="tableHeadZone" >
            <tr>
              {
                showGutter && 
                  getTableCell(showGutter, 0, 'header', {
                    align: showGutter.titleAlign ? showGutter.titleAlign : showGutter.align,
                    children: <>{showGutter.title} </>
                  })
              }
              {columns.map((item, index) => (
                getTableCell(item, showGutter? index+1 : index, 'header', {
                  align: item.titleAlign ? item.titleAlign : item.align,
                  onClick: ()=> (item.sortable? handleColumnSort(item.dataIndex) : {}),
                  children: <>
                    {item.title}
                    {item.sortable && getSortIcon(item.dataIndex)}
                  </>
                })
              ))}
            </tr>
          </thead>
          <tbody className="tableBodyZone">
            {data.map((record, dataInd) => {
              return (
                <tr key={`table-row--${dataInd}`} id={`table-row--${dataInd}`} onClick={(e) => handleRowClick(e, record)} className={record.highlight ? 'highlight' : ''}>
                  {
                    showGutter && 
                    getTableCell(showGutter, 0, 'cell', {
                      children: `${dataInd+1}`
                    })
                  }
                  {columns.map((item, index) => (
                    getTableCell(item, showGutter? index+1 : index, 'cell', {
                      align: item.titleAlign ? item.titleAlign : item.align,
                      onClick: item.onCell ? (e) => handleClickCell(e, item.onCell, record) : () => {},
                      children: <>
                        {item.render? 
                          item.render(record[item.dataIndex], record, dataInd)
                        : record[item.dataIndex]}
                      </>
                    })
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="emptyTable">No Data</div>
      )}
    </>
  );
};

export default Table;
