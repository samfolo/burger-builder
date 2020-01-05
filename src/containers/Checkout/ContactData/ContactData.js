import React from 'react';
import Classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';
import * as actionCreators from '../../../store/actions';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler';

class ContactData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Enter your name',
          },
          value: '',
          validation: {
            required: true,
            minLength: 3,
          },
          valid: false,
          touched: false,
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Enter your street name',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        city: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Enter your city',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Enter your postcode',
          },
          value: '',
          validation: {
            required: true,
            minLength: 5,
            maxLength: 5,
          },
          valid: false,
          touched: false,
        },
        country: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'united-kingdom', displayValue: 'United Kingdom'},
              {value: 'not-the-united-kingdom', displayValue: 'Not The United Kingdom'},
            ],
            placeholder: 'Enter your country',
          },
          value: 'N/A',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'},
            ],
            placeholder: 'Enter your preferred delivery method',
          },
          value: 'fastest',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
      },
    }
  }

  getOrder = () => {
    console.log(this.props.userID, '............');
    return {
      ingredients: this.props.ingredients,
      price: +this.props.totalPrice.toFixed(2),
      customer: {
        name: this.state.orderForm.name.value,
        address: {
          street: this.state.orderForm.street.value,
          city: this.state.orderForm.city.value,
          zipCode: this.state.orderForm.zipCode.value,
          country: this.state.orderForm.country.value,
        },
        email: this.props.email,
      },
      userID: this.props.userID,
      deliveryMethod: this.state.orderForm.deliveryMethod.value,
    }
  }

  handleOrder = (e) => {    
    e.preventDefault();
    this.props.onPurchaseStart();
    const order = this.getOrder();
    this.props.onOrder(order, this.props.token);
    this.props.history.push('/');
  }

  handleChange = (e, field) => {
    const orderForm = {...this.state.orderForm};
    const orderFormField = {...orderForm[field]};
    orderFormField.value = e.target.value;
    orderFormField.valid = this.checkValidity(orderFormField.value, orderFormField.validation);
    orderFormField.touched = true;
    orderForm[field] = orderFormField; // above is deep cloning

    this.setState({ orderForm: orderForm })
  }

  renderInputs = () => {
    const orderFormKeys = Object.keys(this.state.orderForm);

    const renderedInputs = orderFormKeys.map((key, i) => {
      return <Input 
        key={`${i}_${key}`}
        elementType={this.state.orderForm[key].elementType} 
        elementConfig={this.state.orderForm[key].elementConfig} 
        value={this.state.orderForm[key].value}
        validation={this.state.orderForm[key].validation}
        valid={this.state.orderForm[key].valid}
        shouldValidate={this.state.orderForm[key].validation ? true : undefined}
        touched={this.state.orderForm[key].touched}
        onChange={(e) => this.handleChange(e, key)} />
    });

    return renderedInputs;
  }

  checkValidity(fieldValue, rules) {
    let isValid = true ;
    let trueFieldValue = fieldValue.trim();

    if (rules.required) {
      isValid = isValid && trueFieldValue !== '';
    }

    if (rules.minLength) {
      isValid = isValid && trueFieldValue.length >= rules.minLength
    }

    if (rules.maxLength) {
      isValid = isValid && trueFieldValue.length <= rules.maxLength
    }

    if (rules.format) {
      isValid = isValid && rules.format.test(trueFieldValue);
    }

    return isValid
  }

  isInvalidForm = () => {
    const allFields = Object.keys(this.state.orderForm);

    const validFields = allFields.map(field => {
      return (
        this.state.orderForm[field].valid
      );
    });
    return validFields.includes(false);
  }

  render() {
    let form = (
      <Aux>
        <h4>Enter your Contact Data</h4>
        <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={this.handleOrder}>      
          {this.renderInputs()}
          <Button buttonType='Success' disabled={this.isInvalidForm()}>ORDER NOW</Button>
        </form>
      </Aux>
    );

    if (this.state.loading) {
      form = <Spinner />
    }
    
    return (
      <div className={Classes.ContactData}>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.builder.ingredients,
    totalPrice: state.builder.totalPrice,
    loading: state.order.loading,
    purchasing: state.order.purchasing,
    purchaseComplete: state.order.purchaseComplete,
    error: state.order.error,
    token: state.auth.token,
    email: state.auth.email,
    userID: state.auth.userID,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearIngredients: () => dispatch({type: actionTypes.CLEAR_INGREDIENTS}),
    onOrder: (order, token) => dispatch(actionCreators.handleOrder(order, token)),
    onPurchaseStart: () => dispatch(actionCreators.purchaseBurgerStart()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
