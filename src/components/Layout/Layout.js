import React from 'react';
import Classes from './Layout.module.css';
import Aux from '../../hoc/Aux';
import ToolBar from '../Navigation/ToolBar/ToolBar'

const Layout = props => (
  <Aux>
    <ToolBar />
    <div className={Classes.Content}>
      {props.children}
    </div>
  </Aux>
);

export default Layout;