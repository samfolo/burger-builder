import React from 'react';
import classes from './Order.module.css';
import { render } from '@testing-library/react';

class Order extends React.Component {
  pluralize = (word, amount) => {
    return amount !== 1 ? word + 's' : word;
  }

  capitalize = (word) => {
    return word[0].toUpperCase() + word.slice(1, word.length);
  }

  render() {
    const ingredientArray = [];

    for (let name in this.props.ingredients) {
      ingredientArray.push({ 
        ingredient: this.props.ingredients[name].ingredient,
        amount: this.props.ingredients[name].amount })
    }

    const renderedIngredients = ingredientArray.map((ing, i) => {
      return (
        <span key={`id_${i}`} style={{
          display: 'inline-block',
          margin: '8px 8px',
          border: '1px solid #ccc',
          padding: '5px',
        }}>
          {this.capitalize(ing.ingredient)}: {`${ing.amount} ${this.pluralize('Serving', ing.amount)}`}
        </span>
      );
    })

    return (
      <div className={classes.Order}>
        <p>Ingredients:</p>
        {renderedIngredients}
        <p>Price: <strong>£{this.props.price.toFixed(2)}</strong></p>
      </div>
    );
  }
}

export default Order;
