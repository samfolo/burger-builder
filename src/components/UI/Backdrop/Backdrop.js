import React from 'react';
import Classes from './Backdrop.module.css';

const Backdrop = props => (
  props.show ? <div className={Classes.Backdrop} onClick={props.onClick}></div> : null
);

export default Backdrop;
