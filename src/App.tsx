import React, { ReactElement, useEffect, useState } from 'react';

import './App.css';
import { Board } from './components/board';
import { Game } from './entities/Game';
import { Unit } from './entities/units';
import { unit, turnGenerator, action, ActionType } from './types';
import { ROWS_COUNT, COLUMNS_COUNT } from './helpers/constants';
import { Sidebar } from './components/sidebar';

let initialUnits: unit[][] | undefined = undefined;

function App(): ReactElement {
  const [units, setUnits] = useState<unit[][]>();
  const [turnGenerator, setTurnGenerator] = useState<turnGenerator>();
  const [action, setAction] = useState<action>();
  const [toSelectTarget, setToSelectTarget] = useState<boolean>(false);
  const [currentUnit, setCurrentUnit] = useState<Unit>();
  const [turnsCount, setTurnsCount] = useState<number>(1);

  function handleSelectTarget(unit: Unit): void {
    const dealAction = action?.doAction(ActionType.deal, turnGenerator?.getCurrentUnit() as Unit);
    const unitBoardLocation = action?.getBoardLocationOfTarget(unit);
    if (typeof dealAction === 'function' && unitBoardLocation) {
      dealAction(unitBoardLocation);
    }
    setToSelectTarget(false);
    setTurnsCount(turnsCount + 1);
  }

  function handleDefense(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const defendingAction = action?.doAction(ActionType.defense, currentUnit as Unit);
    setTurnsCount(turnsCount + 1);
  }

  useEffect(() => {
    const initialGameData = Game.start(ROWS_COUNT, COLUMNS_COUNT);
    setUnits(initialGameData.units);
    setTurnGenerator(initialGameData.turnGenerator);
    setAction(initialGameData.action);
    initialUnits = [...initialGameData.units.map((u) => [...u])];
  }, []);

  useEffect(() => {
    setCurrentUnit(turnGenerator?.next());
  }, [turnGenerator]);

  useEffect(() => {
    setCurrentUnit(turnGenerator?.getCurrentUnit());
  }, [turnsCount]);

  if (!units) {
    return <div>Loading</div>;
  }

  return (
    <div className="App">
      <Board
        units={units as unit[][]}
        initialUnits={initialUnits as unit[][]}
        toSelectTarget={toSelectTarget}
        handleSelectTarget={handleSelectTarget}
        currentUnit={currentUnit as Unit}
        action={action as action}
      />
      <Sidebar
        turnGenerator={turnGenerator as turnGenerator}
        toSelectTarget={toSelectTarget}
        setToSelectTarget={setToSelectTarget}
        currentUnit={currentUnit as Unit}
        handleDefense={handleDefense}
      />
    </div>
  );
}

export default App;
