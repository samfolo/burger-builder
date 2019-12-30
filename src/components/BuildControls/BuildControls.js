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
  return (
    <div className={Classes.BuildControls}>
      {
        controls.map((control, i) => {
          return (
            <BuildControl 
              key={`id_${control.type}_${i}`}
              label={control.label} 
              type={control.type} 
              onSelect={props.onSelect} />
          );
        })
      }
    </div>
  );
}

export default BuildControls;