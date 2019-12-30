import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import Classes from './Burger.module.css';

const Burger = props => {
   return (
    <div className={Classes.Burger}>
      <BurgerIngredient type="bread-top" />
      <BurgerIngredient type="cheese" />
      <BurgerIngredient type="meat" />
      <BurgerIngredient type="bread-bottom" />
    </div>
   );
};

export default Burger;