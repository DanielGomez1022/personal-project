import React, { Component } from 'react';
import './App.css';
import routes from './routes'
class App extends Component {
  
  render() {
    return (
      <div className = 'nav'>
      {routes}
      </div>
    );
  }
}

export default App;
