import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [
        { ingredient: 'salad', amount: 1, price: 0.5 },
        { ingredient: 'bacon', amount: 1, price: 0.4 },
        { ingredient: 'cheese', amount: 1, price: 1.3 },
        { ingredient: 'meat', amount: 1, price: 0.7 },
      ]
    }
  }
  
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} />
      </div>
    );
  }
}

export default Checkout;