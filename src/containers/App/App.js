import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Classes from './App.module.css';
import Layout from '../../hoc/Layout/Layout';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';
import Checkout from '../Checkout/Checkout';
import Orders from '../Orders/Orders';
import Auth from '../Auth/Auth';
import Logout from '../Logout/Logout';

class App extends React.Component {
  render() {
    return (
      <div className={Classes.App}>
        <Layout>
          <Switch>
            <Route path='/' exact component={BurgerBuilder} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Route path='/auth' component={Auth} />
            <Route path='/sign-out' component={Logout} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
