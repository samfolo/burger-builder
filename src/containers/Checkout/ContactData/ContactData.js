import React from 'react';
import Classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: {
        street: '',
        zipCode: '',
      },
      orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Enter your name',
          },
          value: '',
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Enter your email',
          },
          value: '',
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Enter your street name',
          },
          value: '',
        },
        city: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Enter your city',
          },
          value: '',
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Enter your postcode',
          },
          value: '',
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
          value: '',
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
          value: '',
        },
      },
      loading: false,
      purchasing: false,
      purchaseComplete: false,
      error: false,
    }
  }

  handleOrder = (e) => {
    // ...
    // alert('how DARE you continue on this the day of my wedding');
    this.setState({ loading: true, });
    e.preventDefault();

    console.log(this.state.orderForm)

    const order = {
      ingredients: this.props.ingredients,
      price: +this.props.price.toFixed(2),
      customer: {
        name: this.state.orderForm.name.value,
        address: {
          street: this.state.orderForm.street.value,
          city: this.state.orderForm.city.value,
          zipCode: this.state.orderForm.zipCode.value,
          country: this.state.orderForm.country.value,
        },
        email: this.state.orderForm.email.value,
      },
      deliveryMethod: this.state.orderForm.deliveryMethod.value,
    }

    console.log(order)

    axios.post('/orders.json', order)
    .then(response => {
      console.log(response);
      this.setState({
        loading: false,
        purchasing: false,
        purchaseComplete: true,
      });
    })
    .catch(error => {
      console.log(error)
      this.setState({
        loading: false,
        purchasing: false,
      });
    });

    this.props.history.push('/')
  }

  handleChange = (e, field) => {
    const orderForm = {...this.state.orderForm};
    orderForm[field].value = e.target.value;
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
        onChange={(e) => this.handleChange(e, key)} />
    });

    return renderedInputs;
  }

  render() {
    let form = (
      <Aux>
        <h4>Enter your Contact Data</h4>
        <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>      
          {this.renderInputs()}
          <Button buttonType='Success' onClick={this.handleOrder}>ORDER NOW</Button>
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

export default ContactData;
