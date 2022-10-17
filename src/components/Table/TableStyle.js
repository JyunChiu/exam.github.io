import styled from 'styled-components';
import { SmallSrcollBar } from '~~styles/_commonStyle';
import { COMMON_COLOR } from '~~styles/_variables';
import { respondSmallerThan } from '~~styles/_variables';

const TableBox = styled.div`
  ${SmallSrcollBar(2)}
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${COMMON_COLOR.GRAY};
  font-size: 12px;
  max-height: 500px;

  table{
    table-layout: fixed;
    /* border-collapse: collapse; */
    border-collapse: separate;
    border-spacing: 0;
    border-width: 0px;
    width: 100%;
    border-color: ${COMMON_COLOR.GRAY};
  }

  .tableHeadZone{
    overflow-x: auto;
    padding: 0 3px 0 0;
    border-bottom: 1px solid ${COMMON_COLOR.GRAY};
    background: #eeeeee;
    position: sticky;
    top: 0;
    z-index: 3;
    tr{
      .tableCell{
        background: #eeeeee;
        border-bottom-width: 1px;
        &.sortable{
          cursor: pointer;
        }
        .iconSort{
          font-size: 14px;
          margin: 0 0 0 2px;
          transition: .4s ease;
        }
        .iconExpand{
          margin: 0 4px 0 0;
          transition: .4s ease;
        }
        .iconSort:active, .iconExpand:active{
          transform: scale(0.9);
        }
      }
    }
    ::-webkit-scrollbar {
      &:horizontal{ display: none }
    }
  }

  .tableBodyZone{
    tr{
      &:not(:last-child){
        border-bottom: 1px solid ${COMMON_COLOR.GRAY};
        .tableCell{
          border-bottom-width: 1px;
        }
      }
      .tableCell{
        background: ${COMMON_COLOR.WHITE};
      }
    }
  }

  .emptyTable{
    display: flex;
    justify-content: center;
    margin: 8% 0;
    font-size: 1rem;
    font-weight: 500;
  }

`;

const TableCell = styled.td`
  padding: 5px;
  width: ${props => props.width || 'auto'};
  letter-spacing: 0;
  text-align: ${props => props.align || 'center'};
  >div{
    display: flex;
    align-items: center;
    justify-content: ${props=>alignSwitch( props.align)};
    >span{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  &:first-child{
    position: ${props=>(props.columnHeaderFreeze || props.showGutter)? 'sticky' : 'unset'};
    z-index: 1;
    left: 0;
  }
  &:nth-child(2){
    position: ${props=>(props.columnHeaderFreeze && props.showGutter)? 'sticky' : 'unset'};
    z-index: 1;
    left: 32px;
  }
  &:not(:last-child){
    border-right: 1px solid ${COMMON_COLOR.GRAY};
  }
  
  &.hasChildren{
    background: #eeeeee !important;
  }
`;

function alignSwitch(align){
  switch(align){
    case 'left':
      return 'flex-start'
    case 'right':
      return 'flex-end'
    default:
      return 'center'
  }
}

export {
  TableBox,
  TableCell,
}