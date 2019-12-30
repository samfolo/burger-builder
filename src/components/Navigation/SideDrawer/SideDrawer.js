import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const SideDrawer = props => {
  const attachedClasses = [Classes.SideDrawer, Classes[props.isOpen ? 'Open' : 'Close']].join(' ')
  return (
    <Aux>
      <Backdrop show={props.isOpen} onClick={props.onClick} />
      <div className={attachedClasses}>
        <div className={Classes.Logo}><Logo /></div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
}

export default SideDrawer;