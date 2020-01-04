import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    purchasing: false,
    purchaseComplete: true,
    loading: false,
  }
}

export const purchaseBurgerFailed = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    loading: false,
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
    loading: true,
  }
}
export const handleOrder = (order) => {
  console.log(order)

  return dispatch => {
    axios.post('/orders.json', order)
    .then(response => {
      dispatch(purchaseBurgerSuccess());
    })
    .catch(error => {
      dispatch(purchaseBurgerFailed());
    });
  }
}

export const beginNewOrder = () => {
  return {
    type: actionTypes.BEGIN_NEW_ORDER,
    purchaseComplete: false,
  }
}