import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
// <Router history={ createBrowserHistory() }>
import App from './components/App';
import reducers from './reducers';



const createStoreWithMiddleware = applyMiddleware()(
    createStore
);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={ createBrowserHistory() }>
        <Route path="/" component={App} />
    </Router>
  </Provider>
, document.getElementById('root'));


registerServiceWorker();
