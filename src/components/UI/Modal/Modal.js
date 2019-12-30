import React from 'react';
import Classes from './Modal.module.css';

const Modal = props => {
  return (
    <div 
    className={Classes.Modal} 
    style={{ 
      transform: props.purchasing ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: props.purchasing ? '1' : '0'
    }}>
      {props.children}
    </div>
  );
}

export default Modal;
