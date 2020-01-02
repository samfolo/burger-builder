import React from 'react';
import Button from '../../../components/UI/Button/Button';
import Classes from './ContactData.module.css';

class ContactData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: {
        street: '',
        zipCode: '',
      },
    };
  }
  render() {
    return (
      <div className={Classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input className={Classes.Input} type='text' name='name' placeholder='Enter your name' />
          <input className={Classes.Input} type='email' name='email' placeholder='Enter your email'/>
          <input className={Classes.Input} type='text' name='street' placeholder='Enter your street'/>
          <input className={Classes.Input} type='text' name='postcode' placeholder='Enter your postcode'/>
          <Button buttonType='Success' onClick={null}>ORDER NOW</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
