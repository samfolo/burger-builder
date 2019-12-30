import React from 'react';
import Classes from './ToolBar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const ToolBar = props => {
  return (
    <header className={Classes.ToolBar}>
      <div>MENU</div>
      <Logo />
      <nav>
        <NavigationItems />
      </nav>
    </header>
  );
}

export default ToolBar;