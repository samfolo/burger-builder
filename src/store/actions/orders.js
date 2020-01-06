import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const loadingOrders = () => {
  return {
    type: actionTypes.LOADING_ORDERS,
    loading: true,
  }
}

export const orderRetrievalSuccesful = data => {
  return {
    type: actionTypes.ORDER_RETRIEVAL_SUCCESSFUL,
    data: data
  }
}

export const orderRetrievalFailed = () => {
  return {
    type: actionTypes.ORDER_RETRIEVAL_FAILED,
    loading: false,
  }
}

export const getOrders = (token, userID) => {
  return dispatch => {
    const queryParams = `?auth=${token}&orderBy="userID"&equalTo="${userID}"`;
    axios.get('/orders.json' + queryParams)
    .then(response => {
      dispatch(orderRetrievalSuccesful(response.data));
    })
    .catch(error => {
      dispatch(orderRetrievalFailed());
    });
  }
}