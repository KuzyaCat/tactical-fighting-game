import { Board, Location, Action } from './board';
import { Unit } from './units';
import { boardLocation, unit } from '../types';
import { Randomizer, TurnGenerator } from './generators';

type initialGameData = {
  units: unit[][];
  turnGenerator: TurnGenerator;
  action: Action;
};

export class Game {
  static units: unit[][];
  static location: Location;
  static turnGenerator: TurnGenerator;

  static start(rowsCount: number, columnsCount: number): initialGameData {
    const randomizer = new Randomizer();
    const board = new Board(rowsCount, columnsCount);
    board.fillWithUnits(randomizer.generateFullBoardUnits(rowsCount, columnsCount));
    this.location = new Location(board);
    this.units = board.getBoardMatrix();
    this.turnGenerator = new TurnGenerator(this.units as Unit[][], randomizer);
    const action = new Action(this.location, board, this.turnGenerator);

    return {
      units: this.units,
      turnGenerator: new TurnGenerator(this.units as Unit[][], randomizer),
      action,
    };
  }

  static isFinished(currentUnit: Unit): boolean {
    return this.location
      .getAllEnemiesLocation(this.location.getUnitBoardLocation(currentUnit) as boardLocation)
      .some((enemyLocation) => this.location.isAlive(enemyLocation));
  }
}
