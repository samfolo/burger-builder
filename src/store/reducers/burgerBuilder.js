import * as actionTypes from '../actions';
import updateState from '../utility/updateState';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
}



const handleSelection = (state, action) => {
  let updatedState = {...state};
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
  return { updatedTotalPrice: updatedTotalPrice, newIngredientsState: newIngredientsState, }
}

const mapTypesToIngredients = (action) => {
  const types = ['salad', 'bacon', 'cheese', 'meat']
  return types.map(type => {
    return ({
      ingredient: action.order[type].ingredient,
      amount: action.order[type].amount,
      price: action.order[type].price,
    })
  });
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_SELECTION:
      const res = handleSelection(state, action);
      return updateState(state, { ingredients: res.newIngredientsState, totalPrice: res.updatedTotalPrice, building: true, });
    case actionTypes.SET_INGREDIENTS:
      const ingredients = mapTypesToIngredients(action);
      return updateState(state, { ingredients: ingredients, totalPrice: initialState.totalPrice, error: false, building: false, });
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateState(state, { error: true, });
    case actionTypes.CLEAR_INGREDIENTS:
      return updateState(state, { ingredients: [...initialState.ingredients], });
    default : return state;
  }
}

export default orderReducer;
