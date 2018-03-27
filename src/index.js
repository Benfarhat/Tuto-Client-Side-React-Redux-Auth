import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import App from './components/App';
import reducers from './reducers';



const createStoreWithMiddleware = applyMiddleware()(
    createStore, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={ createBrowserHistory() }>
        <Route path="/" component={App} />
    </Router>
  </Provider>
, document.getElementById('root'));


registerServiceWorker();
