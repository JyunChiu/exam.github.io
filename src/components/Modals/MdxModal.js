import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as R from 'ramda';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-xcode";
import 'ace-builds/webpack-resolver';
import { IoCubeOutline } from "react-icons/io5";
import { Button } from '~~components/Buttons';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '~~components/Modals';
import { COMMON_COLOR } from '~~styles/_variables';

const StyledModal = styled(Modal)`
  .modal-content {
    .modal-title{
      .iconCube{
        margin: 0 2px 0 0;
      }
    }
    /* Body Style */
    .modal-body {
      padding: 10px;
      .ace_editor{
        width: 100% !important;
        height: unset !important;
        min-height: 400px !important;
        max-height: 500px !important;
      }
    }

    /* Footer Style */
    .modal-footer {
      padding: 10px 0 20px;
      .btnSave{
        background: ${COMMON_COLOR.BLUE};
        border-color: ${COMMON_COLOR.BLUE};
        color: ${COMMON_COLOR.WHITE};
      }
    }
  }
`;

const MdxModal = (props) => {
  const {
    children,
    modalSize,
    isOpen,
    toggleClose = () => { },
    mdxCode = '',
    onSave = () => { },
    onChange = () => { },
    readOnly = false,
    ...restProps
  } = props;
  const [orginalCode, setOrginalCode] = useState('')

  useEffect(() => {
    if (isOpen) {
      setOrginalCode(mdxCode)
    }
  }, [isOpen])

  function handleSave() {
    toggleClose();
    const isSameWithOrginal = R.equals(orginalCode, mdxCode)
    if (isSameWithOrginal) return
    onSave();
  }

  function handleChange(val) {
    onChange(val)
  }

  return (
    <StyledModal contentClassName={modalSize} isOpen={isOpen} {...restProps}>
      <ModalHeader><IoCubeOutline className='iconCube' />MDX</ModalHeader>
      <ModalBody>
        <AceEditor
          mode="xml"
          theme="xcode"
          onChange={handleChange}
          name="mdxCode"
          value={mdxCode}
          readOnly={readOnly}
          tabSize={2}
        />
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSave} className='btnSave'>Save</Button>
        <Button onClick={toggleClose}>Close</Button>
      </ModalFooter>
    </StyledModal>
  );
};

export default MdxModal;
