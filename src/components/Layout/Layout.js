import React from 'react';
import Classes from './Layout.module.css';
import Aux from '../../hoc/Aux';

const Layout = props => (
  <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <div className={Classes.Content}>
      {props.children}
    </div>
  </Aux>
);

export default Layout;