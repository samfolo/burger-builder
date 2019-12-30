import React from 'react';
import Classes from './Layout.module.css';
import Aux from '../../hoc/Aux';
import ToolBar from '../Navigation/ToolBar/ToolBar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = props => (
  <Aux>
    <ToolBar />
    <SideDrawer />
    <div className={Classes.Content}>
      {props.children}
    </div>
  </Aux>
);

export default Layout;