import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as R from 'ramda';
import { BsCodeSlash, BsFillPencilFill } from "react-icons/bs";
import { HomeResource } from '~~apis/resource';
import { TableBox, Table } from '~~components/Table';
import { Button } from '~~components/Buttons';
import { MdxModal } from '~~components/Modals';
import { comma } from '~~utils/CommonUtils';
import BarChart from './Bar';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5% 6%;
  .wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 15px;
    min-height: 40px;
    >div:not(:last-child){
      margin: 0 10px 0 0
    }
  }
`

const columnWidth = '6rem'

const columns = [
  {
    title: 'plan_chart_of_accounts',
    dataIndex: 'accountName',
    width: '10rem',
    className: 'btnCell',
    align: 'center',
    titleAlign: 'center',
    sortable: true,
  },
  {
    title: 'Q1-2004',
    dataIndex: 'Q1-2004',
    width: columnWidth,
    className: 'btnCell',
    align: 'right',
    sortable: true,
    render: (value, record) => comma(Math.round(value)),
    showChildren: true,
    children: [
      {
        title: 'Jan-2004',
        dataIndex: 'Jan-2004',
        width: columnWidth,
        className: 'btnCell',
        align: 'right',
        sortable: true,
        editable: true,
        render: (value, record) => comma(Math.round(value)),
      },
      {
        title: 'Feb-2004',
        dataIndex: 'Feb-2004',
        width: columnWidth,
        className: 'btnCell',
        align: 'right',
        sortable: true,
        editable: true,
        render: (value, record) => comma(Math.round(value)),
      },
      {
        title: 'Mar-2004',
        dataIndex: 'Mar-2004',
        width: columnWidth,
        className: 'btnCell',
        align: 'right',
        sortable: true,
        editable: true,
        render: (value, record) => comma(Math.round(value)),
      },
    ]
  },
  {
    title: 'Q2-2004',
    dataIndex: 'Q2-2004',
    width: columnWidth,
    className: 'btnCell',
    align: 'right',
    sortable: true,
    render: (value, record) => comma(Math.round(value)),
    showChildren: true,
    children: [
      {
        title: 'Apr-2004',
        dataIndex: 'Apr-2004',
        width: columnWidth,
        className: 'btnCell',
        align: 'right',
        editable: true,
        render: (value, record) => comma(Math.round(value)),
      },
      {
        title: 'May-2004',
        dataIndex: 'May-2004',
        width: columnWidth,
        className: 'btnCell',
        align: 'right',
        editable: true,
        render: (value, record) => comma(Math.round(value)),
      },
      {
        title: 'Jun-2004',
        dataIndex: 'Jun-2004',
        width: columnWidth,
        className: 'btnCell',
        align: 'right',
        editable: true,
        render: (value, record) => comma(Math.round(value)),
      },
    ]
  },
  {
    title: 'Q3-2004',
    dataIndex: 'Q3-2004',
    width: columnWidth,
    className: 'btnCell',
    align: 'right',
    sortable: true,
    render: (value, record) => comma(Math.round(value)),
    showChildren: true,
    children: [
      {
        title: 'Jul-2004',
        dataIndex: 'Jul-2004',
        width: columnWidth,
        className: 'btnCell',
        align: 'right',
        editable: true,
        render: (value, record) => comma(Math.round(value)),
      },
      {
        title: 'Aug-2004',
        dataIndex: 'Aug-2004',
        width: columnWidth,
        className: 'btnCell',
        align: 'right',
        editable: true,
        render: (value, record) => comma(Math.round(value)),
      },
      {
        title: 'Sep-2004',
        dataIndex: 'Sep-2004',
        width: columnWidth,
        className: 'btnCell',
        align: 'right',
        editable: true,
        render: (value, record) => comma(Math.round(value)),
      },
    ]
  },
  {
    title: 'Q4-2004',
    dataIndex: 'Q4-2004',
    width: columnWidth,
    className: 'btnCell',
    align: 'right',
    sortable: true,
    render: (value, record) => comma(Math.round(value)),
    showChildren: true,
    children: [
      {
        title: 'Oct-2004',
        dataIndex: 'Oct-2004',
        width: columnWidth,
        className: 'btnCell',
        align: 'right',
        editable: true,
        render: (value, record) => comma(Math.round(value)),
      },
      {
        title: 'Nov-2004',
        dataIndex: 'Nov-2004',
        width: columnWidth,
        className: 'btnCell',
        align: 'right',
        editable: true,
        render: (value, record) => comma(Math.round(value)),
      },
      {
        title: 'Dec-2004',
        dataIndex: 'Dec-2004',
        width: columnWidth,
        className: 'btnCell',
        align: 'right',
        editable: true,
        render: (value, record) => comma(Math.round(value)),
      },
    ]
  },

]

const Demo2 = (props) => {
  const [isMdxOpen, setIsMdxOpen] = useState(false)
  const [mdxCode, setMdxCode] = useState(`SELECT
  {TM1SubsetToSet([plan_time].[plan_time], "plan_time_2004_qtrs_and_month")}
  PROPERTIES [plan_time].[plan_time].[Time]  ON COLUMNS, 
  TM1SubsetAll([plan_chart_of_accounts]) 
  PROPERTIES [plan_chart_of_accounts].[plan_chart_of_accounts].[AccountName]  ON ROWS 
FROM [plan_BudgetPlan] 
WHERE (
  [plan_version].[plan_version].[FY 2004 Budget],
  [plan_business_unit].[plan_business_unit].[10110],
  [plan_department].[plan_department].[105],
  [plan_exchange_rates].[plan_exchange_rates].[local],
  [plan_source].[plan_source].[input]
)`)
  const [dataSource, setDataSource] = useState([])
  const [chartXOpt, setChartOpt] = useState([])
  const [chartGroupOpt, setChartGroupOpt] = useState([])
  const [ editMode, setEditMode ] = useState(false)

  // console.log('dataSource', dataSource)

  useEffect(() => {
    getTableByMdx(mdxCode)
  }, [])

  function getTableByMdx(data) {
    HomeResource.getTableByMdx({ MDX: data.replace(/\n/g, ' ') })
      .then(response => {
        // console.log('getTableByMdx response -----', response);
        const { data } = response
        let list = data.Axes[1].Tuples.map((item, index) => {
          const key = item.Members[0]
          //chartXOpt
          setChartOpt(prev => ([...prev, { label: key.Attributes.AccountName, value: key.Name }]))
          //dataSource item
          const updatedItem =
            data.Axes[0].Tuples.reduce((prev, curr) => {
              const key = curr?.Members[0]
              return {
                ...prev,
                [key?.Attributes?.Time]: ''
              }
            }, { accountName: key.Attributes.AccountName, name: key.Name, no: index + 1 })
          return updatedItem
        })

        //chartGroup
        const group = data.Axes[0].Tuples.map(item => ({ label: item.Members[0].Name, value: item.Members[0].Name }))
        setChartGroupOpt(group)

        setDataSource(list)
        getCells(data.ID, list)
      })
      .catch(error => {
        // console.log('getTableByMdx error -----', error.response);
      });
  }

  function getCells(id, list) {
    HomeResource.getCells(id)
      .then(response => {
        // console.log('getCells response -----', response);
        const { data: { Cells } } = response
        const newList = list.map((item, index) => {
          const group = 15 * index
          return {
            ...item,
            [columns[1].dataIndex]: Cells[group + item.no - 1].Value,
            [columns[1].children[0].dataIndex]: Cells[group + item.no].Value,
            [columns[1].children[1].dataIndex]: Cells[group + item.no + 1].Value,
            [columns[1].children[2].dataIndex]: Cells[group + item.no + 2].Value,
            [columns[2].dataIndex]: Cells[group + item.no + 3].Value,
            [columns[2].children[0].dataIndex]: Cells[group + item.no + 4].Value,
            [columns[2].children[1].dataIndex]: Cells[group + item.no + 5].Value,
            [columns[2].children[2].dataIndex]: Cells[group + item.no + 6].Value,
            [columns[3].dataIndex]: Cells[group + item.no + 7].Value,
            [columns[3].children[0].dataIndex]: Cells[group + item.no + 8].Value,
            [columns[3].children[1].dataIndex]: Cells[group + item.no + 9].Value,
            [columns[3].children[2].dataIndex]: Cells[group + item.no + 10].Value,
            [columns[4].dataIndex]: Cells[group + item.no + 11].Value,
            [columns[4].children[0].dataIndex]: Cells[group + item.no + 12].Value,
            [columns[4].children[1].dataIndex]: Cells[group + item.no + 13].Value,
            [columns[4].children[2].dataIndex]: Cells[group + item.no + 14].Value,
          }
        })
        setDataSource(newList)
      })
      .catch(error => {
        // console.log('error -----', error.response);
      });
  }

  function handleModalClick(status) {
    setIsMdxOpen(status)
  }

  function handleMdxChange(val) {
    setMdxCode(val)
  }

  function handleMdxModalSave() {
    getTableByMdx(mdxCode)
  }

  function handleSave(){
    console.log('SAVE :::::', dataSource)
    setEditMode(false)
  }

  return (
    <Div>
      {
        editMode? 
        <div className='wrapper'>
          <Button onClick={handleSave}>
            Save
          </Button>
          <Button onClick={() => setEditMode(false)}>
            Cancel
          </Button>
        </div> :
        <div className='wrapper'>
          <Button onClick={() => setEditMode(true)}>
            <BsFillPencilFill />
          </Button>
          <Button onClick={() => handleModalClick(true)}>
            <BsCodeSlash />
          </Button>
        </div>
      }
     
      <TableBox>
        <Table
          columns={columns}
          dataSource={dataSource}
          setDataSource={setDataSource}
          columnHeaderFreeze
          editMode={editMode}
          showGutter={
            {
              title: '',
              dataIndex: '',
              width: '2rem',
              className: 'gutterCell',
              align: 'center',
            }}
        />
      </TableBox>
      <BarChart
        dataSource={dataSource}
        chartXOpt={chartXOpt}
        chartGroupOpt={chartGroupOpt}
      />
      <MdxModal
        isOpen={isMdxOpen}
        toggleClose={() => handleModalClick(false)}
        mdxCode={mdxCode}
        onChange={handleMdxChange}
        onSave={handleMdxModalSave}
        readOnly
      />
    </Div>
  );
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Demo2);
