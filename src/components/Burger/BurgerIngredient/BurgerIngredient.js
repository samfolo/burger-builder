import React from 'react';
import Classes from './BurgerIngredient.module.css'

const BurgerIngredient = props => {
  let ingredient;

  switch (props.type) {
    case 'bread-bottom':
      ingredient = <div className={Classes.BreadBottom}></div>
      break;
  }

  return ();
};

export default BurgerIngredient;