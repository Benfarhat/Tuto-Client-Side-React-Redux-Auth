import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Header extends Component {

    setBgHeaderMenu = (e) => {
        e.preventDefault()
        this.props.setDarkHeader(!this.props.isDarkHeader)
    }


    getBgHeader = () => {
        if(this.props.isDarkHeader){
            return "navbar navbar-expand-md navbar-dark fixed-top bg-info"
          } else {
            return "navbar navbar-expand-md navbar-dark fixed-top bg-dark"
        }  
    }  
     
    render () {
        console.log(this.props)
        return (
        <header>
            <nav className={this.getBgHeader()}>
              <a className="navbar-brand" href="/" onClick={this.setBgHeaderMenu}>Turn to {this.props.isDarkHeader ? 'Grey' : 'Blue'}</a>
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
        isDarkHeader: state.isDarkHeader
    }
}


export default connect(mapStateToProps, actions)(Header)