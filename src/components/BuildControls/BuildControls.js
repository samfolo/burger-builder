import React from 'react';
import Classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
]

const BuildControls = props => {

  const amountSelected = ingredient => {
    const target = props.ingredients.find(selected => selected.ingredient === ingredient);
    return target.amount;
  }

  return (
    <div className={Classes.BuildControls}>
<p>Current Price: <strong>£{props.price.toFixed(2)}</strong></p>
      {
        controls.map((control, i) => {
          return (
            <BuildControl 
              key={`id_${control.type}_${i}`}
              label={control.label} 
              type={control.type} 
              onSelect={props.onSelect} 
              ingredientAmount={amountSelected(control.type)} />
          );
        })
      }
    </div>
  );
}

export default BuildControls;