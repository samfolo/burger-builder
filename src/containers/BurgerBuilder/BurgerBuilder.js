import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from '../../axios-orders';
import Aux from '../../hoc/Aux/Aux';
import * as actionCreators from '../../store/actions';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';

class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      purchasing: false,
      purchaseComplete: false,
    }
  }

  componentDidMount() {
    //currently not using any of this:
    this.props.onInitIngredients();
  }

  isBurgerEmpty = () => {
    const allIngredients = [...this.props.ingredients].map(ing => ing.amount);
    const ingredientsCount = allIngredients.reduce((a, b) => a + b);
    return ingredientsCount <= 0;
  }

  handleOrderClick = () => {
    this.setState({ purchasing: true });
  }

  handleAbortOrder = () => {
    this.setState({ purchasing: false });
  }

  handleContinueOrder = () => {
    // const queryParams = [];
    // for (let i in this.props.ingredients) {
    //   console.log(this.props.ingredients[i])
    //   queryParams.push(`${encodeURIComponent(this.props.ingredients[i].ingredient)}=${encodeURIComponent(this.props.ingredients[i].amount)}_${encodeURIComponent(this.props.ingredients[i].price)}`);
    // }
    // queryParams.push(`price=${this.props.totalPrice}`);
    // const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      // search: `?${queryString}`,
      state: ({
        ingredients: this.props.ingredients,
      })
    });
  }

  render() {
    let orderSummary = null;
    let burger = this.props.error ? <p style={{textAlign: 'center'}}>Cannot load ingredients</p> : <Spinner />

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls 
            onSelect={this.props.handleSelection} 
            ingredients={this.props.ingredients} 
            price={this.props.totalPrice}
            noIngredients={this.isBurgerEmpty()}
            onOrder={this.handleOrderClick} />
        </Aux>
      );

      orderSummary = <OrderSummary 
        onAbort={this.handleAbortOrder}
        onContinue={this.handleContinueOrder}
        ingredients={this.props.ingredients} 
        totalPrice={this.props.totalPrice} />
    }

    return (
      <Aux>
        {this.state.purchaseComplete ? <Redirect to='/checkout' /> : null}
        <Modal show={this.state.purchasing} onAbort={this.handleAbortOrder} >
          {orderSummary}
        </Modal>
          {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.builder.ingredients,
    totalPrice: state.builder.totalPrice,
    error: state.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSelection: (ingredient, change) => dispatch(actionCreators.handleSelection(ingredient, change)),
    onInitIngredients: () => dispatch(actionCreators.initIngredients()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));