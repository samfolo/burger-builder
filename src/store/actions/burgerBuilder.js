import * as actionTypes from './actionTypes';

export const handleSelection = (ingredient, change) => {
  return {
    type: actionTypes.HANDLE_SELECTION, 
    payload: {
      ingredient: ingredient,
      change: change,
    }
  }
};
