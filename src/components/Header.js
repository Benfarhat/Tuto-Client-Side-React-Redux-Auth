import React, { Component } from 'react'

export default class Header extends Component {
    render () {
        return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
              <a className="navbar-brand" href="/">Title</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </nav>
          </header>
        )
    }
}