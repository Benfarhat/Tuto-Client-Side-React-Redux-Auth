import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect, NavLink } from 'react-router-dom';

const Application = () => (
    <div className="header">
      <header>
        <Switch>
            <Route path="/" exact component={SignInMenu} />
            <Route path="/signin" component={SignInMenu} />
            <Route path="/private" component={SignOutMenu} />
        </Switch>
      </header>
      <main>
        <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/signin" component={Login} />
            <Route path="/signup" component={Register} />
            <Route path="/private" component={Private} />
            <Route component={HomePage}/>
        </Switch>
      </main>
    </div>
  )
  
  
  const HomePage =() => <div>Home Page</div>
  const Login = () => <div>Login Page</div>
  const Register = () => <div>Register Page</div>
  const Private = () => <div>User Logged!</div>
  const SignInMenu = () => <ul><NavLink to="/" exact activeClassName="active">Home Page</NavLink><NavLink to="/signin" exact activeClassName="active">Login Page</NavLink><NavLink to="/private" exact activeClassName="active">Logged Page</NavLink></ul>
  const SignOutMenu = () => <ul><NavLink to="/" exact activeClassName="active">Home Page</NavLink><NavLink to="/" exact activeClassName="active">Logout Page</NavLink><NavLink to="/" exact activeClassName="active">Your settings</NavLink></ul>
  
 ReactDOM.render(<BrowserRouter><Application /></BrowserRouter>, document.getElementById('root'))
