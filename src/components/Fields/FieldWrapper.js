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
    width: 100%;
    background: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .styleInput {
    flex: 1;
    -webkit-appearance: none;
    outline: none;
    border: none;
    border-radius: inherit;
    width: 100%;
    background: none;
    letter-spacing: 1px;
    font-family: 'Noto Sans TC', sans-serif !important;

    ::placeholder {
      color: #cecccc;
      letter-spacing: 1px;
    }

    &:disabled {
      background: none;
      color: #858585;
      -webkit-text-fill-color: #858585;
      opacity: 1;
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: ${COMMON_COLOR.BLACK};
    }
    &:-internal-autofill-selected {
      box-shadow: inset 0px 0px 0px 30px white;
    }
  }

  .functionBtn{
    color: #cecccc;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.5s ease all;
  }

  .menuBox{
    ${SmallSrcollBar(6)}
    width: 100%;
    border: 1px solid ${COMMON_COLOR.GRAY};
    border-radius: inherit;
    background: #fff;
    position: absolute;
    left: 0;
    top: 105%;
    z-index: 5;
    overflow-y: auto;
    max-height: 217px;
    cursor: auto;
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
        pointer-events: none;
      }
      &.disabled {
        pointer-events: none;
      }
      &:hover {
        background: #b5c8e566;
      }
    }
  }
  
`;

export default FieldWrapper;
