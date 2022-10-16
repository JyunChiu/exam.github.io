import React from 'react';
import { ModalHeader } from 'reactstrap';
import { Button } from '../Buttons';
import { IoIosArrowBack } from 'react-icons/io';

const CustomizedModalHeader = (props) => {
  const {
    children,
    handleGoBack = null
  } = props;

  return (
    <ModalHeader>
      {typeof handleGoBack === 'function' && (
        <Button className="btnBack" onClick={handleGoBack}>
          <IoIosArrowBack />
        </Button>
      )}
      {children}
    </ModalHeader>
  );
};

export default CustomizedModalHeader;
