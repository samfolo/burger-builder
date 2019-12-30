import React from 'react';
import Classes from './BuildControl.module.css'

const BuildControl = props => {
  const isDisabled = props.ingredientAmount <= 0;

  return (
    <div className={Classes.BuildControl}>
      <div className={Classes.Label}>{props.label}</div>
      <button 
        disabled={isDisabled}
        className={Classes.Less} 
        onClick={() => props.onSelect(props.type, 'Less')}
        >Less</button>
      <button
        className={Classes.More}
        onClick={() => props.onSelect(props.type, 'More')}>More</button>
    </div>
  );
}

export default BuildControl;