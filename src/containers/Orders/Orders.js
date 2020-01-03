import React from 'react';
import Classes from './Orders.module.css';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

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
    this.setState({ loadng: true });

    axios.get('/orders.json')
    .then(response => {
      const orders = Object.keys(response.data);
      const mappedOrders = orders.map((order, i) => {
        return (
          {
            ...response.data[order],
            id: order,
          }
        );
      })

      console.log(mappedOrders);
      this.setState({ 
        orders: mappedOrders,
        loadng: false,
      });
    })
    .catch(error => {
      this.setState({ loadng: false });
    })
  }

  render() {
    let orders = <Spinner />

    if (this.state.orders) {
      orders = this.state.orders.map((order, i) => {
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

  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
