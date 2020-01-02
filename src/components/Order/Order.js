import React from 'react';
import classes from './Order.module.css';
import { render } from '@testing-library/react';

class Order extends React.Component {
  pluralize = (word, amount) => {
    return amount !== 1 ? word + 's' : word;
  }

  render() {
    return (
      <div className={classes.Order}>
        <p>Ingredients: </p>
      </div>
    );
  }
}

export default Order;
