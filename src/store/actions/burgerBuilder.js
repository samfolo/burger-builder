import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const handleSelection = (ingredient, change) => {
  return {
    type: actionTypes.HANDLE_SELECTION, 
    payload: {
      ingredient: ingredient,
      change: change,
    }
  }
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    order: ingredients,
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
    .then(response => {
      dispatch(setIngredients(response.data));
    })
    .catch(error => {
      dispatch(fetchIngredientsFailed());
    });
  }
}


