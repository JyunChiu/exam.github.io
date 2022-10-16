import React, { useRef } from 'react';
import { TableCell } from './TableStyle';
import * as R from 'ramda'

const Table = (props) => {
  const { columns, dataSource, onRow } = props;

  function handleRowClick(e, record) {
    e.stopPropagation();
    onRow(record);
  }

  function handleClickCell(e, onCell, record) {
    e.stopPropagation();
    onCell(record);
  }

  function getCellClassName(item) {
    let result = ['tableCell'];
    if (item.className) {
      result.push(item.className);
    }
    if (item.freeze) {
      result.push('freeze');
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

    // return { left: `${position}px` }
  }

  return (
    <>
      {dataSource.length > 0 ? (
        <table>
          <thead className="tableHeadZone" >
            <tr>
              {columns.map((item, index) => (
                <TableCell
                  key={`table-header--${item.dataIndex}--${index + 1}`}
                  id={`table-header--${index + 1}`}
                  className={getCellClassName(item)}
                  width={item.width}
                  align={item.titleAlign ? item.titleAlign : item.align}
                  position={item.freeze ? getPosition(`table-header--${index}`) : ''}
                // style={item.freeze ? getPosition(`table-header--${index + 1}`) : ''}
                >
                  {item.title}
                </TableCell>
              ))}
            </tr>
          </thead>
          <tbody className="tableBodyZone">
            {dataSource.map((record, dataInd) => {
              return (
                <tr key={`table-row--${dataInd}`} onClick={(e) => handleRowClick(e, record)} className={record.highlight ? 'highlight' : ''}>
                  {columns.map((item, index) => (
                    <TableCell
                      key={`table-cell--${item.dataIndex}--${index + 1}`}
                      id={`table-cell--${index + 1}`}
                      className={getCellClassName(item)}
                      width={item.width}
                      align={item.align}
                      onClick={item.onCell ? (e) => handleClickCell(e, item.onCell, record) : () => { }}
                      // style={item.freeze ? getPosition(`table-cell--${index + 1}`) : ''}
                      position={item.freeze ? getPosition(`table-header--${index}`) : ''}
                    >
                      {item.render
                        ? item.render(record[item.dataIndex], record, dataInd)
                        : record[item.dataIndex]}
                    </TableCell>
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

Table.defaultProps = {
  columns: [],
  dataSource: [],
  onRow: () => { },
};

export default Table;
