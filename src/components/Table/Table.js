import React, { useEffect, useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { TableCell } from './TableStyle';
import * as R from 'ramda'

const SORTORDER = {
  DESC: 'descend',
  ASC: 'ascend'
}

const Table = (props) => {
  const { 
    columnHeaderFreeze = false,
    showGutter = false,
    columns = [], 
    dataSource = [], 
    onRow = () => {},
  } = props;
  const [ data, setData ] = useState(dataSource);
  const [ columnData, setColumnData ]= useState(columns);
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
    if (item.children?.length > 0) {
      result.push('hasChildren');
    }
    if (item.sortable) {
      result.push('sortable');
    }

    return result.join(' ');
  }


  function handleColumnSort(column){
    const index = handleFindItem('column', column, sortInfo, 'findIndex')
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
    const obj = handleFindItem('column', dataIndex, sortInfo, 'find')
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

  function handleFindItem(key, value, list, method){
    return R[method](R.propEq(key, value))(list)
  }

  function getTableCell(item, index, key, props){
    return(
      <TableCell
        key={`table-${key}--${item.dataIndex}--${index + 1}`}
        id={`table-${key}--${index + 1}`}
        className={getCellClassName(item)}
        width={item.width}
        align={item.align}
        columnHeaderFreeze={columnHeaderFreeze}
        showGutter={showGutter}
        {...props}
      >
       {props.children}
      </TableCell>
    )
  }

  function handleColumnExpand(e, key){
    e.stopPropagation();
    const index =  handleFindItem('dataIndex', key, columnData, 'findIndex')
    let updatedColumn = [...columnData]
    const orginItem = [...columnData][index]
    // 更新showChildren
    updatedColumn[index] = {...orginItem, showChildren: !orginItem.showChildren}
    setColumnData(updatedColumn)
  }

  return (
    <>
      {data.length > 0 ?
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
              {columnData.map((item, index) => (
                <>
                  {
                    getTableCell(item, showGutter? index+1 : index, 'header', {
                      align: item.titleAlign ? item.titleAlign : item.align,
                      children:(
                        <div>
                          {item?.children?.length>0 && 
                            (item.showChildren? 
                              <AiFillMinusSquare className='iconExpand' onClick={(e)=>handleColumnExpand(e, item.dataIndex)} /> 
                            : <AiFillPlusSquare className='iconExpand'  onClick={(e)=>handleColumnExpand(e, item.dataIndex)} /> )
                          }
                          <span onClick={()=> (item.sortable? handleColumnSort(item.dataIndex) : {})}>{item.title}</span>
                          {item.sortable && getSortIcon(item.dataIndex)}
                        </div>
                      )
                    })
                  }
                  {
                    item.showChildren && 
                    (item.children.map((child)=>(
                      getTableCell(child, showGutter? index+1 : index, 'header', {
                        align: child.titleAlign ? child.titleAlign : child.align,
                        children:(
                          <div>
                            <span onClick={()=> (child.sortable? handleColumnSort(child.dataIndex) : {})}>{child.title}</span>
                            {child.sortable && getSortIcon(child.dataIndex)}
                          </div>
                        )
                      })
                    )))
                  }
                </>
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
                  {columnData.map((item, index) => (
                    <>
                      {
                        getTableCell(item, showGutter? index+1 : index, 'cell', {
                          align: item.titleAlign ? item.titleAlign : item.align,
                          onClick: item.onCell ? (e) => handleClickCell(e, item.onCell, record) : () => {},
                          children: (
                            <div>
                              {item.render? 
                                item.render(record[item.dataIndex], record, dataInd)
                              : record[item.dataIndex]}
                            </div>
                          )
                        })
                      }
                      {
                        item.showChildren && 
                        (item.children.map((child)=>(
                          getTableCell(child, showGutter? index+1 : index, 'cell', {
                            align: child.titleAlign ? child.titleAlign : child.align,
                            children: (
                              <div>
                                {child.render? 
                                  child.render(record[child.dataIndex], record, dataInd)
                                : record[child.dataIndex]}
                              </div>
                            )
                          })
                        )))
                      }
                    </>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table> : 
        <div className="emptyTable">No Data</div>
      }
    </>
  );
};

export default Table;
