import React, { Component } from 'react';
import './App.css';

import ContactForm from './ContactForm';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="App-header">
          <h2>Welcome to Lendyoo Web</h2>
        </div>
        <p className="App-intro">
          We are working on it ...
        </p>
          <ContactForm></ContactForm>
      </div>
    );
  }
}

export default App;
