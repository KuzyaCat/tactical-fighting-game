import React, { ReactElement, useEffect, useRef, useState, MutableRefObject } from 'react';

import './App.css';
import { Game } from './entities/Game';
import { Board } from './components/board';
import { unit, turnGenerator, action } from './types';
import { ROWS_COUNT, COLUMNS_COUNT } from './helpers/constants';

let initialUnits: unit[][] | undefined = undefined;

function App(): ReactElement {
  const [units, setUnits] = useState<unit[][]>();
  const [turnGenerator, setTurnGenerator] = useState<turnGenerator>();
  const [action, setAction] = useState<action>();

  useEffect(() => {
    const initialGameData = Game.start(ROWS_COUNT, COLUMNS_COUNT);
    setUnits(initialGameData.units);
    setTurnGenerator(initialGameData.turnGenerator);
    setAction(initialGameData.action);
    initialUnits = initialGameData.units;
  }, []);

  if (!units) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <Board units={units as unit[][]} initialUnits={initialUnits as unit[][]} />
    </div>
  );
  // const case1 = Game.case1(ROWS_COUNT, COLUMNS_COUNT);

  // return <div>{case1}</div>;
}

export default App;
