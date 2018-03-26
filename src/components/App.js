import React, { Component } from 'react';
import Header from './Header'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <main className="mt-3 container">
          <h1 className="pt-5">Header</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla interdum mauris eget pulvinar.</p>
        </main>
      </div>
    );
  }
}