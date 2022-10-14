import React, { useRef } from 'react';
import { TableCell } from './TableStyle';
import * as R from 'ramda'

const Table = (props) => {
  const { columns, dataSource, onRow, hoverTitle = false } = props;
  const headZoneRef = useRef(null);
  const bodyZoneRef = useRef(null);

  function handleHeadScroll() {
    bodyZoneRef.current.scrollLeft = headZoneRef.current.scrollLeft;
  }

  function handleBodyScroll() {
    headZoneRef.current.scrollLeft = bodyZoneRef.current.scrollLeft;
  }

  function handleRowClick(e, record) {
    e.stopPropagation();
    onRow(record);
  }

  function handleClickCell(e, onCell, record) {
    e.stopPropagation();
    onCell(record);
  }

  return (
    <>
      <div className="tableHeadZone" ref={headZoneRef} id="tableHeadZone" onScroll={handleHeadScroll}>
        <table>
          <thead>
            <tr>
              {columns.map((item, index) => (
                <TableCell
                  key={`table-header--${item.dataIndex}--${index + 1}`}
                  className={item.className ? `tableCell ${item.className}` : 'tableCell'}
                  width={item.width}
                  align={item.align}
                  title={hoverTitle ? item.title : ''}
                >
                  {item.title}
                </TableCell>
              ))}
            </tr>
          </thead>
        </table>
      </div>
      <div className="tableBodyZone" ref={bodyZoneRef} id="tableBodyZone" onScroll={handleBodyScroll}>
        {dataSource.length > 0 ? (
          <table>
            <tbody>
              {dataSource.map((record, dataInd) => {
                return (
                  <tr key={`table-row--${dataInd}`} onClick={(e) => handleRowClick(e, record)} className={record.highlight? 'highlight' : ''}>
                    {columns.map((item, index) => (
                      <TableCell
                        key={`table-cell--${item.dataIndex}--${index + 1}`}
                        className={item.className ? `tableCell ${item.className}` : 'tableCell'}
                        width={item.width}
                        align={item.align}
                        onClick={item.onCell ? (e) => handleClickCell(e, item.onCell, record) : () => { }}
                        title={hoverTitle && !item.render ? record[item.dataIndex] : ''}
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
          <div className="emptyTable">無資料</div>
        )}
      </div>
    </>
  );
};

Table.defaultProps = {
  columns: [],
  dataSource: [],
  onRow: () => { },
};

export default Table;
