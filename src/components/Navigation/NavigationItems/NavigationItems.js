import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import Classes from './NavigationItems.module.css';

const NavigationItems = props => (
  <ul className={Classes.NavigationItems}>
    <NavigationItem link='/'>Burger Builder</NavigationItem>
    <NavigationItem link='/orders'>Orders</NavigationItem>
  </ul>
);

export default NavigationItems;
