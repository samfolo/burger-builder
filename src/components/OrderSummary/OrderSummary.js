import React from 'react';
import Aux from '../../hoc/Aux';
import Button from '../UI/Button/Button';

const OrderSummary = props => {
  const pluralize = (word, amount) => {
    return amount !== 1 ? word + 's' : word;
  }

  const ingredients = props.ingredients.map((selected, i) => {
    return (
    <li 
      key={`id_${selected.ingredient}_i`} 
      style={{textTransform: 'capitalize'}}
  >{selected.ingredient}: {selected.amount} {pluralize('Serving', selected.amount)}</li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredients}
      </ul>
      <p>Continue to Checkout?</p>
      <Button buttonType='Danger' onClick={props.onAbort}>CANCEL</Button>
      <Button buttonType='Success' onClick={props.onContinue}>CONTINUE</Button>
    </Aux>
  );
}
export default OrderSummary;