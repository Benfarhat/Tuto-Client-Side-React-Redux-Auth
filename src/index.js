
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, Switch, Redirect } from 'react-router';
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
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/signin" component={App}/>
            <Route path="/signup" component={App}/>
            <Redirect from="/login" to="/signin"/>
            <Redirect from="/register" to="/signup"/>
            <Route component={App}/>
        </Switch>        
    </Router>
  </Provider>
, document.getElementById('root'));


registerServiceWorker();

