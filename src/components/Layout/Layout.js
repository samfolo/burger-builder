import React from 'react';
import './Layout.module.css';
import Aux from '../../hoc/Aux';

const Layout = props => (
  <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <div>
      {props.children}
    </div>
  </Aux>
);

export default Layout;