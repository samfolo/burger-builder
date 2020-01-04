import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  purchasing: false,
  purchaseComplete: false,
  error: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        purchasing: action.purchasing,
        purchaseComplete: action.purchaseComplete,
        error: false,
      }

    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: action.loading,
      }

    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: action.loading,
        error: true,
      }
    
      case actionTypes.BEGIN_NEW_ORDER:
        return {
          ...state,
          purchaseComplete: false,
        }

    default : return state;
  }
}

export default reducer;
