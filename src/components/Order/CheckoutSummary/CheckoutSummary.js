import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import Classes from './CheckoutSummary.module.css';

const CheckoutSummary = props => {
  return (
    <div className={Classes.CheckoutSummary}>
      <h1>We hope it tastes good!</h1>
      <div className={Classes.Burger}>
        <Burger ingredients={props.ingredients} />
      </div>
      <div>
        <Button buttonType='Danger' clicked>CANCEL</Button>
        <Button buttonType='Success' clicked>CONTINUE</Button>
      </div>
    </div>
  );
}

export default CheckoutSummary;
