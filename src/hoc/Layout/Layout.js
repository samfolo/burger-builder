import React from 'react';
import Classes from './Layout.module.css';
import Aux from '../Aux/Aux';
import ToolBar from '../../components/Navigation/ToolBar/ToolBar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideDrawer: true,
    };
  }

  closeSideDrawer = () => {
    this.setState({ showSideDrawer: false })
  }

  openSideDrawer = () => {
    this.setState((prevState, props) => {
      return { showSideDrawer: true }
    })
  }

  render() {
    return (
      <Aux>
        <ToolBar onClick={this.openSideDrawer} />
        <SideDrawer isOpen={this.state.showSideDrawer} onClick={this.closeSideDrawer} />
        <div className={Classes.Content}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Layout;