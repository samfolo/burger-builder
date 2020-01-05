import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import Classes from './NavigationItems.module.css';

const NavigationItems = props => (
  <ul className={Classes.NavigationItems}>
    <NavigationItem link='/'>Burger Builder</NavigationItem>
    { props.isLoggedIn ? <NavigationItem link='/orders'>Orders</NavigationItem> : null }
    { props.isLoggedIn ? 
      <NavigationItem link='/sign-out'>Sign Out</NavigationItem> : 
      <NavigationItem link='/auth'>Sign In</NavigationItem> }
  </ul>
);

export default NavigationItems;
