import React from 'react';
import Classes from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.purchasing !== this.props.purchasing || 
    nextProps.children !== this.props.children;
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.purchasing} onClick={this.props.onAbort} />
        <div 
          className={Classes.Modal} 
          style={{ 
            transform: this.props.purchasing ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.purchasing ? '1' : '0'
          }}>
            {this.props.children}
          </div>
      </Aux>
    );
  }
}

export default Modal;
