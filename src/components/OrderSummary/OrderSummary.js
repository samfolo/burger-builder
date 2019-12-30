import React from 'react';
import Aux from '../../hoc/Aux';
import Button from '../UI/Button/Button';

class OrderSummary extends React.Component {
  componentDidUpdate(nextProps, nextState) {
    console.log('order summary will update')
  }

  pluralize = (word, amount) => {
    return amount !== 1 ? word + 's' : word;
  }

  render() {
    const ingredients = this.props.ingredients.map((selected, i) => {
      if (selected.amount > 0) {
        return (
          <li 
            key={`id_${selected.ingredient}_i`} 
            style={{textTransform: 'capitalize'}}
          >{selected.ingredient}: {selected.amount} {this.pluralize('Serving', selected.amount)}</li>
        );
      } else {
        return null;
      }
    });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredients}
        </ul>
        <p><strong>Order Total: £{this.props.totalPrice.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button buttonType='Danger' onClick={this.props.onAbort}>CANCEL</Button>
        <Button buttonType='Success' onClick={this.props.onContinue}>CONTINUE</Button>
      </Aux>
    );
  }
}

export default OrderSummary;