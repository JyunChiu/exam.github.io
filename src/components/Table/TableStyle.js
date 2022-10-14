import styled from 'styled-components';
import { SmallSrcollBar } from '~~styles/_commonStyle';
import { respondSmallerThan } from '~~styles/_variables';

const TableBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  table{
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;
    /* user-select: none; */
  }

  .tableHeadZone{
    /* margin: 0 0 5px; */
    /* padding: 0 5px; */
    font-weight: 600;
    border-bottom: 1px solid ${props => props.primary};
    z-index: 1;
    ::-webkit-scrollbar {
      &:horizontal{ display: none }
    }
  }

  .tableBodyZone{
    ${SmallSrcollBar()}
    overflow-y: auto;
    /* padding: 0 5px; */
    z-index: 1;
    ::-webkit-scrollbar {
      &:horizontal{ display: none }
    }
    tr{
      cursor: ${props => props.hasHover ? 'pointer' : 'unset'};
      .tableCell{
        padding: 1px 0;
        letter-spacing: 0;
        &.name{
          letter-spacing: unset;
        }
      }
    }
    .emptyTable{
      display: flex;
      justify-content: center;
      margin: 8% 0;
      font-weight: 500;
    }
  }

  ${respondSmallerThan.mobile_500`
    .tableHeadZone{
      overflow: auto hidden;
      // min-height: 24px;
    }
  `}

`;

const TableCell = styled.td`
  /* padding: 0 5px; */
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: ${props => props.width || 'auto'};
  text-align: ${props => props.align || 'center'};
`;



TableBox.defaultProps = {
  hasHover: false
}

export {
  TableBox,
  TableCell,
}