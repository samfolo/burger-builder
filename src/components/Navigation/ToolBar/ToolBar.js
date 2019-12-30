import React from 'react';
import Classes from './ToolBar.module.css';

const ToolBar = props => {
  return (
    <header className={Classes.ToolBar}>
      <div>MENU</div>
      <div>LOGO</div>
      <nav>
        ...
      </nav>
    </header>
  );
}

export default ToolBar;