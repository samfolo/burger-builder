import React from 'react';
import Classes from './Input.module.css';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let inputEl;

    switch (this.props.inputtype) {
      default:
        inputEl = <input className={Classes.InputEl} {...this.props} />
        break;
      case ('textarea'):
        inputEl = <textarea className={Classes.InputEl} {...this.props} />
        break;
    }

    return (
      <div className={Classes.Input}>
        <label className={Classes.Label}>{this.props.label}</label>
        {inputEl}
      </div>
    );
  }
}

export default Input;