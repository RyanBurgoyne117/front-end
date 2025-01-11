import logo from './logo.svg';
import './App.css';
import React from 'react';
import UsersButton from './components/GetAllUsersButton/UsersButton'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <h2> Hello World!</h2>
        <UsersButton />
      </header>
    </div>
  );
}

export default App;
