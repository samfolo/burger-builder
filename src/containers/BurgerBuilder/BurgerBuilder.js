import React from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';

class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [
        { ingredient: 'salad', amount: 0 },
        { ingredient: 'bacon', amount: 0 },
        { ingredient: 'cheese', amount: 0 },
        { ingredient: 'meat', amount: 0 },
      ],
    }
  }

  handleSelection = (ingredient, change) => {
    const targetIndex = this.state.ingredients.findIndex(selected => selected.ingredient === ingredient);
    const target = this.state.ingredients[targetIndex];
    const newIngredientState = {...target}

    switch (change) {
      case ('Less'):
        if (newIngredientState.amount > 0) {
          newIngredientState.amount --;
        }
        break;
      case ('More'):
        newIngredientState.amount ++;
        break;
      default:
        return false;
    }

    const newIngredientsState = [...this.state.ingredients];
    newIngredientsState[targetIndex] = newIngredientState;
    this.setState({ ingredients: newIngredientsState });
  }

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls onSelect={this.handleSelection} />
      </Aux>
    );
  }
}

export default BurgerBuilder;