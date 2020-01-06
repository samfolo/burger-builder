import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from '../../hoc/asyncComponents';

import Classes from './App.module.css';
import Layout from '../../hoc/Layout/Layout';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';
import Logout from '../Logout/Logout';

const asyncCheckout = asyncComponent(() => {
  return import('../Checkout/Checkout');
})

const asyncOrders = asyncComponent(() => {
  return import('../Orders/Orders');
})

const asyncAuth = asyncComponent(() => {
  return import('../Auth/Auth');
})

class App extends React.Component {
  render() {
    let routes = (
      <Switch>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/auth' component={asyncAuth} />
        <Redirect to='/' />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/auth' component={asyncAuth} />
          <Route path='/sign-out' component={Logout} />
        </Switch>
      );
    }

    return (
      <div className={Classes.App}>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.loggedIn,
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
