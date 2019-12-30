import React from 'react';
import Classes from './Logo.module.css';
import burgerLogo from '../../assets/burger-logo.png'

const Logo = props => (
  <div className={Classes.Logo}>
    <img src={burgerLogo} alt="Burger Builder Logo" style={{ height: props.height }} />
  </div>
);

export default Logo;