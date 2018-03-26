import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import reducers from './reducers';



const createStoreWithMiddleware = applyMiddleware()(
    createStore, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
, document.getElementById('root'));


registerServiceWorker();
