import React from 'react';
import axios from '../../axios-orders';
import Aux from '../../hoc/Aux/Aux'
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
      ingredients: null,
      totalPrice: 4,
      purchasing: false,
      loading: false,
    }
  }

  componentDidMount() {
    axios.get('/ingredients.json')
    .then(response => {
      const types = ['salad', 'bacon', 'cheese', 'meat']
      const ingredients = types.map(type => {
        return ({
          ingredient: response.data[type].ingredient,
          amount: response.data[type].amount,
          price: response.data[type].price,
        })
      });

      this.setState({ ingredients: ingredients, });
      console.log('new ingredients: ', this.state.ingredients);
    });
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
    // alert('how DARE you continue on this the day of my wedding');
    this.setState({ loading: true, });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Sam Folorunsho',
        address: {
          street: '1234 Coder Close',
          city: 'React City',
          zipCode: 100110,
          country: 'United Kingdom',
        },
        email: 'sam@example.com',
      },
      deliveryMethod: 'fastest',
    }

    axios.post('/orders.json', order)
    .then(response => {
      console.log(response);
      this.setState({
        loading: false,
        purchasing: false,
      });
    })
    .catch(error => {
      console.log(error)
      this.setState({
        loading: false,
        purchasing: false,
      });
    });
  }

  render() {
    let orderSummary = null;
    let burger = <Spinner />

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls 
            onSelect={this.handleSelection} 
            ingredients={this.state.ingredients} 
            price={this.state.totalPrice}
            noIngredients={this.isBurgerEmpty()}
            onOrder={this.handleOrderClick} />
        </Aux>
      );
      
      orderSummary = <OrderSummary 
        onAbort={this.handleAbortOrder}
        onContinue={this.handleContinueOrder}
        ingredients={this.state.ingredients} 
        totalPrice={this.state.totalPrice} />
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} onAbort={this.handleAbortOrder} >
          {orderSummary}
        </Modal>
          {burger}
      </Aux>
    );
  }
}

export default errorHandler(BurgerBuilder, axios);