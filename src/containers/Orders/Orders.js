import React from 'react';
import Classes from './Orders.module.css';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null,
    }
  }
  
  componentDidMount() {
    axios.get('/orders.json')
    .then(response => {
      const orders = Object.keys(response.data);
      const mappedOrders = orders.map((order, i) => {
        return (
          {
            ingredients: response.data[order].ingredients,
            price: response.data[order].price,
            customer: {
              name: response.data[order].customer.name,
              address: {
                street: response.data[order].customer.address.street,
                city: response.data[order].customer.address.city,
                zipCode: response.data[order].customer.address.zipCode,
                country: response.data[order].customer.address.country,
              },
              email: response.data[order].customer.email,
            },
            deliveryMethod: response.data[order].deliveryMethod,
          }
        );
      })

      console.log(mappedOrders);
      this.setState({ orders: mappedOrders });
    })
  }

  render() {
    let orders = <Spinner />

    if (this.state.orders) {
      orders = this.state.orders.map((order, i) => {
        return (
          <Order
            key={`order_${i + 1}`}
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

export default Orders;
