import React from 'react';
import Classes from './Button.module.css';

const Button = props => (
  <button 
    className={[Classes.Button, Classes[props.buttonType]].join(' ')}
    disabled={props.disabled}
    onClick={props.onClick}
  >{props.children}</button>
);

export default Button;
