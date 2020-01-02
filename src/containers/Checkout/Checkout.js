import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
    }
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);    
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    console.log(ingredients) // gives us { salad: 0, bacon: 4, cheese: 0, meat: 0 } through query string

    this.setState({ ingredients: this.props.location.state.ingredients }); // through location.state.. easier.
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
      </div>
    );
  }
}

export default Checkout;