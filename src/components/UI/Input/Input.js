import React from 'react';
import Classes from './Input.module.css';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  isValidClass = () => {
    let inputClass = [Classes.InputEl];

    if (!this.props.valid && this.props.shouldValidate) {
      inputClass.push(Classes.Invalid);
    } else {
      inputClass.push(Classes.Valid);
    }

    return inputClass.join(' ')
  }

  render() {
    let inputEl;
    

    switch (this.props.elementType) {
      default:
        inputEl = <input 
          autoComplete = 'new-password'
          className={this.isValidClass()} 
          type={this.props.elementConfig.type} 
          placeholder={this.props.elementConfig.placeholder}
          value={this.props.value}
          required={this.props.validation.required}
          onChange={this.props.onChange} />
        break;
      case ('textarea'):
        inputEl = <textarea 
          className={this.isValidClass()} 
          type={this.props.elementConfig.type} 
          placeholder={this.props.elementConfig.placeholder}
          value={this.props.value}
          required={this.props.validation.required}
          onChange={this.props.onChange} />
        break;
      case ('select'): {
        inputEl = (
          <select 
            onChange={this.props.onChange} 
            defaultValue={this.props.elementConfig.placeholder}
            required={this.props.validation.required}
          >
            <option disabled hidden>{this.props.elementConfig.placeholder}</option>
            {
              this.props.elementConfig.options.map((option, i) => {
                return (
                  <option key={`${i}`} value={option.value}>{option.displayValue}</option>
                );
              })
            }
          </select>
        );
      }
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