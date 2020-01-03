import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import orderReducer from './store/reducers/orderReducer';
import './index.css';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
  builder: orderReducer,
});

const store = createStore(rootReducer);

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
ReactDOM.render(<Provider store={store}>{app}</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
