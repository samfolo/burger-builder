import React from 'react';
import Classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Orders from '../../Orders/Orders';

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
      loading: false,
      purchasing: false,
      purchaseComplete: false,
      error: false,
    };
  }

  handleOrder = (e) => {
    // ...
    // alert('how DARE you continue on this the day of my wedding');
    this.setState({ loading: true, });
    e.preventDefault();

    console.log(this.props.ingredients);

    const order = {
      ingredients: this.props.ingredients,
      price: +this.props.price.toFixed(2),
      customer: {
        name: this.state.name,
        address: {
          street: this.state.street,
          city: 'React City',
          zipCode: this.state.zipCode,
          country: 'United Kingdom',
        },
        email: this.state.email,
      },
      deliveryMethod: 'fastest',
    }

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
    if ( ['name', 'email'].includes(field)) {
      this.setState({ [`${field}`]: e.target.value })
    } else {
      const address = {...this.state.address}
      address[field] = e.target.value
      this.setState({ address: address });
    }
  }

  render() {
    let form = (
      <Aux>
        <h4>Enter your Contact Data</h4>
        <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input className={Classes.Input} type='text' name='name' placeholder='Enter your name' onChange={(e) => this.handleChange(e, 'name')} />
          <input className={Classes.Input} type='email' name='email' placeholder='Enter your email' onChange={(e) => this.handleChange(e, 'email')} />
          <input className={Classes.Input} type='text' name='street' placeholder='Enter your street' onChange={(e) => this.handleChange(e, 'street')} />
          <input className={Classes.Input} type='text' name='postcode' placeholder='Enter your postcode' onChange={(e) => this.handleChange(e, 'zipCode')} />
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
        <Orders />
      </div>
    );
  }
}

export default ContactData;
