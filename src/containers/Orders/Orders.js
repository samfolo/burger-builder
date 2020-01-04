import React from 'react';
import Classes from './Orders.module.css';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      orders: [],
    }
  }
  
  componentDidMount() {
    this.props.onOrderStart();
    this.props.getOrders();
  }

  render() {
    let orders = <Spinner />

    if (this.props.orders) {
      orders = this.props.orders.map((order, i) => {
        return (
          <Order
            key={`order_${order.id}_${i + 1}`}
            customer={order.customer}
            ingredients={order.ingredients}
            price={order.price}
            deliveryMethod={order.deliveryMethod} />
        )
      })
    }
    return (
      <div className={Classes.Orders}>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.orders.loading,
    orders: state.orders.orders,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderStart: () => dispatch(actionCreators.loadingOrders()),
    getOrders: () => dispatch(actionCreators.getOrders()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
