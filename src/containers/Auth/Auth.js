import React from 'react';
import Classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';

class Auth extends React.Component {
  state ={
    authForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Enter your email',
        },
        value: '',
        validation: {
          required: true,
          // eslint-disable-next-line no-useless-escape
          format: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Enter your password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    }
  }

  checkValidity = (fieldValue, rules) => {
    let isValid = true ;
    let trueFieldValue = fieldValue.trim();

    if (rules.required) { isValid = isValid && trueFieldValue !== ''; }
    if (rules.minLength) { isValid = isValid && trueFieldValue.length >= rules.minLength }
    if (rules.maxLength) { isValid = isValid && trueFieldValue.length <= rules.maxLength }
    if (rules.format) { isValid = isValid && rules.format.test(trueFieldValue); }

    return isValid
  }

  renderInputs = () => {
    const authFormKeys = Object.keys(this.state.authForm);

    return authFormKeys.map((key, i) => {
      return <Input 
        key={`${i}_${key}`}
        elementType={this.state.authForm[key].elementType} 
        elementConfig={this.state.authForm[key].elementConfig} 
        value={this.state.authForm[key].value}
        validation={this.state.authForm[key].validation}
        valid={this.state.authForm[key].valid}
        shouldValidate={this.state.authForm[key].validation ? true : undefined}
        touched={this.state.authForm[key].touched}
        onChange={(e) => this.handleChange(e, key)} />
    });
  }

  handleChange = (e, field) => {
    const authForm = {...this.state.authForm};
    const authFormField = {...authForm[field]};
    authFormField.value = e.target.value;
    authFormField.valid = this.checkValidity(authFormField.value, authFormField.validation);
    authFormField.touched = true;
    authForm[field] = authFormField; // above is deep cloning

    this.setState({ authForm: authForm })
  }
  
  isInvalidForm = () => {
    const allFields = Object.keys(this.state.authForm);
    const validFields = allFields.map(field => {
      return (
        this.state.authForm[field].valid
      );
    });
    return validFields.includes(false);
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const email = this.state.authForm.email.value;
    const password = this.state.authForm.password.value;
    this.props.onAuth(email, password)
  }

  render() {
    const form = this.renderInputs();
    
    return (
      <div className={Classes.Auth}>
        <form 
          style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          onSubmit={this.handleSubmit}>
          {form}
          <Button buttonType='Success' disabled={this.isInvalidForm()}>SUBMIT</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actionCreators.auth(email,password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
