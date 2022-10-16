import React from 'react';
import styled, { css } from 'styled-components';
import { Modal } from 'reactstrap';
import { COMMON_COLOR } from '~~styles/_variables';

const XXLargeModalStyle = () => {
  return css`
    max-width: 1000px;
    margin: 5% auto;
  `;
};

const ExtrLargeModalStyle = () => {
  return css`
    max-width: 750px;
    margin: 5% auto;
  `;
};

const LargeModalStyle = () => {
  return css`
    top: 0;
    margin: 5% auto;
    max-width: 600px;
  `;
};

const SmallModalStyle = () => {
  return css`
    top: 18%;
    margin: 0 auto;
    max-width: 500px;
  `;
};

const StyledModal = styled(Modal)`
  /* ${(props) => getModalBaseStyle(props.contentClassName)} */
  max-width: 850px;
  .modal-content {
    border-radius: 12px;
    border: none;
    background: ${COMMON_COLOR.WHITE};
    font-size: inherit;

    &.extrLarge {
    }

    &.large {
    }

    &.small {
    }

    /* Header Style */
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: center;
      border-color: ${COMMON_COLOR.BRAND_3};
      background: ${COMMON_COLOR.WHITE};
      padding: 12px 0;
      letter-spacing: 2px;
      border-radius: 12px 12px 0 0;
      position: sticky;
      top: 0;
      z-index: 3;

      .modal-title {
        font-size: 22px;
        display: flex;
        align-items: center;
        .btnBack {
          position: absolute;
          left: 20px;
          min-width: 50px;
          padding: 5px 0;
         
        }
      }
    }

    /* Body Style */
    .modal-body {
      padding: 40px 50px 20px;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
    }

    /* Footer Style */
    .modal-footer {
      justify-content: center;
      align-items: center;
      padding: 20px 0 30px;
      border: none;
      .styleButton {
        min-width: 120px;
        margin: 0px 20px;
      }
    }
  }
`;

function getModalBaseStyle(modalSize) {
  switch (modalSize) {
    case 'small':
      return SmallModalStyle;
    case 'large':
      return LargeModalStyle;
    case 'extrLarge':
      return ExtrLargeModalStyle;
    case 'XXL':
      return XXLargeModalStyle;
    default:
      break;
  }
}

const CustomizedModal = (props) => {
  const {
    children,
    modalSize = 'large',
    ...restProps
  } = props;

  return (
    <StyledModal contentClassName={modalSize} {...restProps}>
      {children}
    </StyledModal>
  );
};

export default CustomizedModal;
