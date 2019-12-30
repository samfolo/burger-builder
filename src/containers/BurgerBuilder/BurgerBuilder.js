import React from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';

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
    console.log(`$${updatedTotalPrice}`)
  }

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          onSelect={this.handleSelection} 
          ingredients={this.state.ingredients} 
          price={this.state.totalPrice} />
      </Aux>
    );
  }
}

export default BurgerBuilder;