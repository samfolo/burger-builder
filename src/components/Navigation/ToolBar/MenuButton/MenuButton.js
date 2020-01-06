import React from 'react';
import Classes from './MenuButton.module.css';

const MenuButton = props => {
  return (
    <div className={[Classes.MenuButton, Classes.MobileOnly].join(' ')} onClick={props.onClick}>
      <div className={Classes.HamburgerLine}></div>
      <div className={Classes.HamburgerLine}></div>
      <div className={Classes.HamburgerLine}></div>
    </div>
  );
}

export default MenuButton;