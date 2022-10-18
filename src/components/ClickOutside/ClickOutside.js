import React, { useEffect, useRef } from 'react';

const ClickOutside = props => {
  const {
    children,
    onClickOutside = () => console.log('onClickOutside!'),
    excludeClass = [],
    className = ''
  } = props;
  const wrapperRef = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleClickOutside(event) {
    const node = event.target;
    let isAnyCommon

    if (typeof node.className === 'string') {
      const classList = node.className.split(' ');
      isAnyCommon = classList.some(item => excludeClass.includes(item));
    }
    if (isAnyCommon) return;

    if (wrapperRef.current && !wrapperRef.current.contains(node)) {
      onClickOutside();
    }
  }

  return (
    <div ref={wrapperRef} className={`clickOutsideBox ${className}`}>
      {children}
    </div>
  );
};

export default ClickOutside;
