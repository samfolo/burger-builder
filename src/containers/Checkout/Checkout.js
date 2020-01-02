import React from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
    }
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);    
    const ingredients = [];
    for (let param of query.entries()) {
      const [amount, price] = param[1].split('_')
      ingredients.push({ingredient: param[0], amount: +amount, price: +price});
    }
    console.log('ingredients: ', ingredients)

    // this.setState({ ingredients: this.props.location.state.ingredients }); // through location.state.. simpler
    this.setState({ ingredients: ingredients });
  }

  handleCancel = () => {
    this.props.history.goBack();
  }

  handleContinue = () => {
    this.props.history.replace({
      pathname: '/checkout/contact-data'
    });
  }
  
  render() {
    console.log(this.props.location.state)
    return (
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          onCancel={this.handleCancel}
          onContinue={this.handleContinue} />
        <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
      </div>
    );
  }
}

export default Checkout;