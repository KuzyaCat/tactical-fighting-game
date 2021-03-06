import React, { ReactElement, useEffect, useState } from 'react';

import './App.css';
import { Board } from './components/board';
import { Game } from './entities/Game';
import { MassTarget, Unit } from './entities/units';
import { unit, turnGenerator, action, ActionType, Team, boardLocation } from './types';
import { ROWS_COUNT, COLUMNS_COUNT } from './helpers/constants';
import { Sidebar } from './components/sidebar';
import { GameOver } from './components/game-over';

let initialUnits: unit[][] | undefined = undefined;

function App(): ReactElement {
  const [units, setUnits] = useState<unit[][]>();
  const [turnGenerator, setTurnGenerator] = useState<turnGenerator>();
  const [action, setAction] = useState<action>();
  const [toSelectTarget, setToSelectTarget] = useState<boolean>(false);
  const [currentUnit, setCurrentUnit] = useState<Unit>();
  const [turnsCount, setTurnsCount] = useState<number>(1);
  const [finish, setFinish] = useState<{ isFinished: boolean; currentTeam: Team }>();
  const [toStartNewGame, setToStartNewGame] = useState<boolean>(false);

  function handleNewGame(): void {
    setToStartNewGame(!toStartNewGame);
    setFinish(Game.finish(currentUnit as Unit));
  }

  function handleSelectTarget(unit: Unit): void {
    if (currentUnit && action?.getPossibleTargetsOfUnit(currentUnit).findIndex((u) => u === unit) === -1) {
      return;
    }

    const unitBoardLocation = action?.getBoardLocationOfTarget(unit);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dealAction = action?.doAction(ActionType.deal, currentUnit as Unit, unitBoardLocation as boardLocation);
    setToSelectTarget(false);
    setTurnsCount(turnsCount + 1);
  }

  function handleDeal(): void {
    setToSelectTarget(!toSelectTarget);
    if (currentUnit?.getDealCount() instanceof MassTarget) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const dealAction = action?.doAction(ActionType.deal, currentUnit as Unit);
      setToSelectTarget(false);
      setTurnsCount(turnsCount + 1);
    }
  }

  function handleDefense(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const defendingAction = action?.doAction(ActionType.defense, currentUnit as Unit);
    setTurnsCount(turnsCount + 1);
    setToSelectTarget(false);
  }

  useEffect(() => {
    const initialGameData = Game.start(ROWS_COUNT, COLUMNS_COUNT);
    setUnits(initialGameData.units);
    setTurnGenerator(initialGameData.turnGenerator);
    setAction(initialGameData.action);
    initialUnits = [...initialGameData.units.map((u) => [...u])];
  }, [toStartNewGame]);

  useEffect(() => {
    setCurrentUnit(turnGenerator?.next());
  }, [turnGenerator]);

  useEffect(() => {
    if (currentUnit) {
      setFinish(Game.finish(currentUnit as Unit));
    }
    setCurrentUnit(turnGenerator?.getCurrentUnit());
  }, [turnsCount]);

  if (!units) {
    return <div>Loading</div>;
  }

  return (
    <div className="App">
      {finish?.isFinished ? (
        <GameOver currentTeam={finish?.currentTeam} handleNewGame={handleNewGame} />
      ) : (
        <>
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
            handleDeal={handleDeal}
          />
        </>
      )}
    </div>
  );
}

export default App;
