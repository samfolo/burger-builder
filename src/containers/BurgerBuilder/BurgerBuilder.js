import React from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [
        { ingredient: 'salad', amount: 0, price: 0.5 },
        { ingredient: 'bacon', amount: 0, price: 0.4 },
        { ingredient: 'cheese', amount: 0, price: 1.3 },
        { ingredient: 'meat', amount: 0, price: 0.7 },
      ],
      totalPrice: 4,
      purchasing: false,
    }
  }

  handleSelection = (ingredient, change) => {
    const targetIndex = this.state.ingredients.findIndex(selected => selected.ingredient === ingredient);
    const target = this.state.ingredients[targetIndex];
    const newIngredientState = {...target}
    let updatedTotalPrice = this.state.totalPrice

    switch (change) {
      case ('Less'):
        newIngredientState.amount --;
        updatedTotalPrice -= newIngredientState.price;
        break;
      case ('More'):
        newIngredientState.amount ++;
        updatedTotalPrice += newIngredientState.price;
        break;
      default:
        return false;
    }

    const newIngredientsState = [...this.state.ingredients];
    newIngredientsState[targetIndex] = newIngredientState;
    this.setState({ 
      ingredients: newIngredientsState,
      totalPrice: updatedTotalPrice
    });
  }

  isBurgerEmpty = () => {
    const allIngredients = [...this.state.ingredients].map(ing => ing.amount);
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
    alert('how DARE you continue on this the day of my wedding')
  }

  render() {
    return (
      <Aux>
        <Modal purchasing={this.state.purchasing} onAbort={this.handleAbortOrder} >
          <OrderSummary 
            onAbort={this.handleAbortOrder}
            onContinue={this.handleContinueOrder}
            ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          onSelect={this.handleSelection} 
          ingredients={this.state.ingredients} 
          price={this.state.totalPrice}
          noIngredients={this.isBurgerEmpty()}
          onOrder={this.handleOrderClick} />
      </Aux>
    );
  }
}

export default BurgerBuilder;