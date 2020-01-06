import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import Classes from './NavigationItems.module.css';

const NavigationItems = props => (
  <ul className={Classes.NavigationItems}>
    <NavigationItem link='/' onClick={props.onClick}s>Burger Builder</NavigationItem>
    { props.isLoggedIn ? <NavigationItem link='/orders' onClick={props.onClick}>Orders</NavigationItem> : null }
    { props.isLoggedIn ? 
      <NavigationItem link='/sign-out' onClick={props.onClick}>Sign Out</NavigationItem> : 
      <NavigationItem link='/auth' onClick={props.onClick}>Sign In</NavigationItem> }
  </ul>
);

export default NavigationItems;
