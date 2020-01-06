import * as actionTypes from '../actions/actionTypes';
import updateState from '../../shared/utility/updateState';

const initialState = {
  loading: false,
  orders: [],
}

const mapDataToOrder = (data) => {
  const orders = Object.keys(data);
  const mappedOrders = orders.map((order, i) => {
    return (
      {
        ...data[order],
        id: order,
      }
    );
  });

  return mappedOrders;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_ORDERS : return updateState(state, { loading: action.loading });
    case actionTypes.ORDER_RETRIEVAL_SUCCESSFUL : return updateState(state, { orders: mapDataToOrder(action.data), loading: action.loading });
    case actionTypes.ORDER_RETRIEVAL_FAILED : return updateState(state, { loading: action.loading });
    default : return state;
  }
}

export default reducer;
