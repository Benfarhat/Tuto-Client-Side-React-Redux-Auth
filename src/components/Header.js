import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Header extends Component {

    setBgHeaderMenu = () => {
        if(this.props.isDarkHeader){
            return <a className="navbar-brand" href="/" onClick={() => this.props.setDarkHeader(false)}>Title</a>
          } else {
            return <a className="navbar-brand" href="/" onClick={() => this.props.setDarkHeader(true)}>Title</a>
        }  
    }

    setBgHeader = () => {
        if(this.props.isDarkHeader){
            return 'info'
          } else {
            return 'dark'
        }  
    }  
     
    render () {
        return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-{this.setDarkHeader()}">
              { this.setBgHeaderMenu() }
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </nav>
          </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isDarkHeader: state.setDarkHeader
    }
}


export default connect(mapStateToProps, actions)(Header)