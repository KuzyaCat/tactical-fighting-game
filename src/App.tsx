import React, { ReactElement, useEffect, useState } from 'react';

import './App.css';
import { Board } from './components/board';
import { Game } from './entities/Game';
import { Unit } from './entities/units';
import { unit, turnGenerator, action, boardLocation, ActionType } from './types';
import { ROWS_COUNT, COLUMNS_COUNT } from './helpers/constants';
import { Sidebar } from './components/sidebar';

let initialUnits: unit[][] | undefined = undefined;

function App(): ReactElement {
  const [units, setUnits] = useState<unit[][]>();
  const [turnGenerator, setTurnGenerator] = useState<turnGenerator>();
  const [action, setAction] = useState<action>();
  const [toSelectTarget, setToSelectTarget] = useState<boolean>(false);

  function handleSelectTarger(unitBoardLocation: boardLocation): void {
    setToSelectTarget(false);
    const dealAction = action?.doAction(ActionType.deal, turnGenerator?.getCurrentUnit() as Unit);
    // dealAction(unitBoardLocation);
  }

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
      <Board
        units={units as unit[][]}
        initialUnits={initialUnits as unit[][]}
        toSelectTarget={toSelectTarget}
        handleSelectTarger={handleSelectTarger}
      />
      <Sidebar turnGenerator={turnGenerator as turnGenerator} setToSelectTarget={setToSelectTarget} />
    </div>
  );
  // const case1 = Game.case1(ROWS_COUNT, COLUMNS_COUNT);

  // return <div>{case1}</div>;
}

export default App;
