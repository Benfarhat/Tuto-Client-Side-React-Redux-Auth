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
        isDarkHeader: state.isDarkHeader
    }
}


export default connect(mapStateToProps, actions)(Header)