import * as actionTypes from '../actions/actionTypes';
import updateState from '../../shared/utility/updateState';

const initialState = {
  loading: false,
  purchasing: false,
  purchaseComplete: false,
  error: false,
}

const purchaseBurgerSuccess = (state, action) => {
  return updateState( state, { 
    loading: action.loading,
    purchasing: action.purchasing,
    purchaseComplete: action.purchaseComplete,
    error: false,
  });
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS : return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_START : return updateState( state, { loading: action.loading, });
    case actionTypes.PURCHASE_BURGER_FAILED : return updateState( state, { loading: action.loading, error: true, });
    case actionTypes.BEGIN_NEW_ORDER : return updateState( state, { purchaseComplete: false, });
    default : return state;
  }
}

export default reducer;
