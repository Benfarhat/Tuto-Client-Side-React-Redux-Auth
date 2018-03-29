import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

class Signin extends Component {
  render() {
    return (
      <form>
        <fieldset classNale="form-group">
            <label>Username:</label>
            <input className="form-control" />
        </fieldset>  
        <fieldset classNale="form-group">
            <label>Password:</label>
            <input className="form-control" />
        </fieldset>    
        <button action="submit" className="btn btn-primary">Connexion</button> 
      </form>
    )
  }
}


export default reduxForm({
    form: 'signin',
    fields: ['username', 'password']
})(Signin)