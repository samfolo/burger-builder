import React from 'react';
import { Redirect } from 'react-router';
import Classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import checkValidity from '../../shared/utility/validation';

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
    },
    isSignUp: true,
  }

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
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
    authFormField.valid = checkValidity(authFormField.value, authFormField.validation);
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
    const isSignUp = this.state.isSignUp;
    this.props.onAuth(email, password, isSignUp);
  }

  handleFormSwitch = () => {
    this.setState(prevState => {
      return { isSignUp:  !prevState.isSignUp }
    });
  }

  render() {
    let errorMessage = null;
    let form = (
        <form 
          style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          onSubmit={this.handleSubmit}>
          {this.renderInputs()}
          <Button buttonType='Success' disabled={this.isInvalidForm()}>SUBMIT</Button>
        </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    if (this.props.error) {
      errorMessage = (
      <p>Error Code {this.props.error.code}: {this.props.error.message}</p>
      )
    }

    return (
      <div className={Classes.Auth}>
        { this.props.loggedIn ? <Redirect to={this.props.authRedirectPath} /> : null }
        {errorMessage}
        {form}
        <Button 
          buttonType='Danger'
          onClick={this.handleFormSwitch}>
            {this.state.isSignUp ? 'SWITCH TO SIGN IN' : 'SWITCH TO SIGN UP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userID: state.auth.userID,
    loading: state.auth.loading,
    error: state.auth.error,
    loggedIn: state.auth.loggedIn,
    authRedirectPath: state.auth.authRedirectPath,
    buildingBurger: state.builder.building,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actionCreators.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actionCreators.setAuthRedirectPath('/')),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
