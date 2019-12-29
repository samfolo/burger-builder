import React from 'react';
import Classes from './App.module.css';
import Layout from '../../components/Layout/Layout';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';

function App() {
  return (
    <div className={Classes.App}>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
