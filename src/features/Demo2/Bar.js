import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Select } from '~~components/Fields';
import { comma } from '~~utils/CommonUtils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = [
  '#6d86b2',
  '#799d91',
  '#9da17b',
  '#e2ca88',
  '#e3a8bb',
  '#a396c7',
  '#5ca6a9',
  '#c96b6b',
  '#a0876e',
  '#799f91',
  '#6e4f77',
  '#507daf',
  '#c1bd76',
  '#ed8489',
  '#74a5b5',
  '#655244'
]

const Div = styled.div`
  margin: 20px 0 0;
  width: 100%;
  .wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0 10px;
    width: 100%;
  }
  .clickOutsideBox {
    max-width: calc((100% - 10px)/2);
    &:not(:last-child){
      margin: 0 10px 0 0
    }
    .selectWrapper{
      min-width: 260px;
      min-height: 46px;
    }
  }
  .chartWrapper{
    width: 100%;
    height: 400px;
    .recharts-default-legend{
      font-size: 12px;
      margin: 0 40px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
      .recharts-legend-item{
        display: flex;
        align-items: center;
      }
    }
    .recharts-tooltip-wrapper{
      &:focus{
        outline: none;
      }
    }
    text{
      font-size: 12px;
    }
  }
`;

const BarComponent = (props) => {
  const {
    dataSource,
    chartXOpt,
    chartGroupOpt,
  } = props;
  const [size, setSize] = useState({})
  const [data, setData] = useState([])
  const [xAxisData, setxAxisData] = useState([])
  const [barGroup, setBarGroup] = useState([])
  const chartWrapper = useRef()

  useEffect(() => {
    const list = dataSource.filter(item => xAxisData.includes(item.name))
    setData(list)
  }, [JSON.stringify(xAxisData), JSON.stringify(dataSource)])

  useEffect(() => {
    setxAxisData([
      chartXOpt[0]?.value,
      chartXOpt[1]?.value,
      chartXOpt[2]?.value,
      chartXOpt[3]?.value,
      chartXOpt[4]?.value,
      chartXOpt[5]?.value
    ])
    setBarGroup(['Q1-2004', 'Q2-2004', 'Q3-2004', 'Q4-2004'])
  }, [JSON.stringify(chartXOpt), JSON.stringify(chartGroupOpt)])

  useEffect(() => {
    if (!chartWrapper.current) return;
    setSize({
      width: chartWrapper.current.clientWidth,
      height: chartWrapper.current.clientHeight,
      margin: { top: 25, bottom: 10, left: 20, right: 20 },
    });
  }, [chartWrapper, JSON.stringify(dataSource)])

  return (
    <Div>
      <div className='wrapper'>
        <Select
          isMulti
          name='xAxisData'
          hasSearchBar
          placeholder='AccountName'
          value={xAxisData}
          options={chartXOpt}
          onChange={(item) => setxAxisData(item.xAxisData)}
        />
        <Select
          isMulti
          name='barGroup'
          hasSearchBar
          placeholder='Time'
          value={barGroup}
          options={chartGroupOpt}
          onChange={(item) => setBarGroup(item.barGroup)}
        />
      </div>
      <div className='chartWrapper' ref={chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={size.width}
            height={size.height}
            margin={size.margin}
            data={data}
          >
            <XAxis
              dataKey="accountName"
              tickSize={0}
              tickMargin={10}
            />
            <YAxis
              tickSize={0}
              tickMargin={5}
              tickFormatter={(val) => comma(val)}
            />
            <Tooltip
              cursor={{ fill: '#eeeeee' }}
              labelStyle={{ fontSize: '12px', fontWeight: 600, }}
              contentStyle={{ fontSize: '12px', borderRadius: '6px' }}
              wrapperStyle={{ border: 'none', boxShadow: 'none' }}
            />
            <Legend />
            {
              barGroup.map((item, index) => (
                <Bar dataKey={item} fill={COLORS[index]} key={item} />
              ))
            }
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Div>
  );
};

export default BarComponent;
