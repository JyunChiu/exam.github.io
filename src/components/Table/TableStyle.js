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
    .emptyTable{
      display: flex;
      justify-content: center;
      margin: 8% 0;
      font-weight: 500;
    }
  }

`;

const TableCell = styled.td`
  padding: 5px 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: ${props => props.width || 'auto'};
  text-align: ${props => props.align || 'center'};
  letter-spacing: 0;
  &:not(:last-child){
    border-right: 1px solid ${COMMON_COLOR.GRAY};
  }
  &.freeze{
    position: sticky;
    z-index: 1;
    left: ${props => `${props.position}px`}
  }
`;


export {
  TableBox,
  TableCell,
}