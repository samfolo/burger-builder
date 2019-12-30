import React from 'react';
import Classes from './ToolBar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawer from '../SideDrawer/SideDrawer';
const ToolBar = props => {
  return (
    <header className={Classes.ToolBar}>
      <div>MENU</div>
      <div className={Classes.Logo}><Logo /></div>
      <nav className={Classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
}

export default ToolBar;