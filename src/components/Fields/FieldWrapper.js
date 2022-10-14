import styled from 'styled-components';
import { SmallSrcollBar } from '~~styles/_commonStyle';
import { COMMON_COLOR } from '~~styles/_variables';

const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${COMMON_COLOR.BLACK};
  border-radius: 8px;
  position: relative;
  width: fit-content;
  padding: 8px 12px;

  &:focus {
    outline: none;
  }

  &.disabled {
    background-image: linear-gradient(180deg, #f2f2f2, #d5d5d5),
      linear-gradient(180deg, #b0b0b0, #e4e1e1, #ffffff);
  }

  .valueBox{
    flex: 1;
    -webkit-appearance: none;
    outline: none;
    border: none;
    background: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    min-height: 23px;
  }

  .functionBtn{
    color: #cecccc;
    font-size: 20px;
    cursor: pointer;
    margin: 0 0 0 5px;
    transition: 0.5s ease all;
  }

  .menuBox{
    width: 100%;
    border: 1px solid ${COMMON_COLOR.GRAY};
    border-radius: inherit;
    background: #fff;
    position: absolute;
    left: 0;
    top: 105%;
    z-index: 5;
    cursor: auto;
    .optionBox{
      ${SmallSrcollBar(6)}
      max-height: 217px;
      ::-webkit-scrollbar-thumb {
        background-clip: padding-box;
        border: 1.5px solid transparent;
        border-radius: 8px;
      }
      .item{
        display: flex;
        align-items: center;
        padding: 10px 12px;
        cursor: pointer;
        &.active {
          background: #75a3d366;
        }
        &.unSelected{
          &:hover {
            background: #b5c8e566;
          }
        }
        &.disabled {
          pointer-events: none;
        }
      }
      .noOption{
        color: ${COMMON_COLOR.GRAY};
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 15px 0;
      }
    }
  }
  
`;

export default FieldWrapper;
