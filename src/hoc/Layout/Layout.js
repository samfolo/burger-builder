import React from 'react';
import Classes from './Layout.module.css';
import Aux from '../Aux/Aux';
import ToolBar from '../../components/Navigation/ToolBar/ToolBar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideDrawer: false,
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
        <ToolBar isLoggedIn={this.props.loggedIn} onClick={this.openSideDrawer} />
        <SideDrawer isLoggedIn={this.props.loggedIn} isOpen={this.state.showSideDrawer} onClick={this.closeSideDrawer} />
        <div className={Classes.Content}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps)(Layout);