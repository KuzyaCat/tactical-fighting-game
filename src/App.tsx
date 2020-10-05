import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Game } from './entities/Game';
import { ROWS_COUNT, COLUMNS_COUNT } from './helpers/constants';

function App() {
  const keis: string = Game.case8(ROWS_COUNT, COLUMNS_COUNT);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          {keis}
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
