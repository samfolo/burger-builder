import * as actionTypes from '../actions';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
}

const orderReducer = (state = initialState, action) => {
  let updatedState = {...state};

  switch (action.type) {
    case actionTypes.HANDLE_SELECTION:
      let updatedTotalPrice = updatedState.totalPrice;
      const targetIndex = state.ingredients.findIndex(selected => selected.ingredient === action.payload.ingredient);
      const target = state.ingredients[targetIndex];
      const newIngredientState = {...target}
  
      switch (action.payload.change) {
        case ('Less'):
          newIngredientState.amount --;
          updatedTotalPrice -= newIngredientState.price;
          break;
        case ('More'):
          newIngredientState.amount ++;
          updatedTotalPrice += newIngredientState.price;
          break;
        default:
      }
  
      const newIngredientsState = [...state.ingredients];
      newIngredientsState[targetIndex] = newIngredientState;

      return {
        ...state,
        ingredients: newIngredientsState,
        totalPrice: updatedTotalPrice,
      }

    case actionTypes.SET_INGREDIENTS:
      const types = ['salad', 'bacon', 'cheese', 'meat']
      const ingredients = types.map(type => {
        return ({
          ingredient: action.order[type].ingredient,
          amount: action.order[type].amount,
          price: action.order[type].price,
        })
      });
      console.log('[burgerBuilder.js], redux ingredients: ', ingredients);
      return {
        ...state,
        ingredients: ingredients,
        totalPrice: initialState.totalPrice,
        error: false,
      }

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      }
    case actionTypes.CLEAR_INGREDIENTS:
      return {
        ...updatedState,
        ingredients: [...initialState.ingredients],
      }
      
    default:
  }
  return state;
}

export default orderReducer;
