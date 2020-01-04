import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
  handleCancel = () => {
    this.props.history.goBack();
  }

  handleContinue = () => {
    this.props.history.replace({
      pathname: '/checkout/contact-data'
    });
  }

  render() {
    let summary = <Redirect to='/' />

    if (this.props.ingredients) {
      summary = <CheckoutSummary 
        ingredients={this.props.ingredients}
        onCancel={this.handleCancel}
        onContinue={this.handleContinue} />
    }

    return (
      <div>
        {summary}
        <Route 
          path={this.props.match.path + '/contact-data'} 
          render={() => <ContactData
            {...this.props}
            ingredients={this.props.ingredients}
            price={this.props.totalPrice} />} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    totalPrice: state.builder.totalPrice,
    ingredients: state.builder.ingredients,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    beginNewOrder: () => dispatch(actionCreators.beginNewOrder()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
