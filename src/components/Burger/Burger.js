import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import Classes from './Burger.module.css';

const Burger = props => {
  const renderIngredients = () => {
    const renderedIngredients = [];

    props.ingredients.forEach((selected, i) => {
      for (let i = 0; i < selected.amount; i++) {
        renderedIngredients.push(
          <BurgerIngredient 
            key={`id_${selected.ingredient}_${i + 1}`} 
            type={selected.ingredient} />
        );
      }
    });

    if (renderedIngredients.length === 0) {
      return <h3>Please begin your burgerrrr</h3>
    }
    return renderedIngredients;
  }

  return (
    <div className={Classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {renderIngredients()}
      <BurgerIngredient type="bread-bottom" />
    </div>
   );
};

export default Burger;