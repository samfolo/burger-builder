import * as actionTypes from '../actions';

const initialState = {
  ingredients: [
    {ingredient: 'salad', amount: 0, price: 0.5,},
    {ingredient: 'bacon', amount: 0, price: 0.4,},
    {ingredient: 'cheese', amount: 0, price: 1.3,},
    {ingredient: 'meat', amount: 0, price: 0.7,},
  ],
  totalPrice: 4,
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_SELECTION:
      const updatedState = {...state};
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

      console.log('redux ingredients: ', newIngredientState)
      return {
        ...state,
        ingredients: newIngredientsState,
        totalPrice: updatedTotalPrice,
      }
      
    default:
  }
  return state;
}

export default orderReducer;
