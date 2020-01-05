import React from 'react';
import Classes from './ToolBar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuButton from './MenuButton/MenuButton';

const ToolBar = props => {
  return (
    <header className={Classes.ToolBar}>
      <MenuButton onClick={props.onClick} />
      <div className={Classes.Logo}><Logo /></div>
      <nav className={Classes.DesktopOnly}>
        <NavigationItems isLoggedIn={props.isLoggedIn} />
      </nav>
    </header>
  );
}

export default ToolBar;