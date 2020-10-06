import { Board, Location, Action } from './board';
import { Archimage, Unit } from './units';
import { ActionType, boardLocation, unit } from '../types';
import { Randomizer, TurnGenerator } from './generators';

type initialGameData = {
  units: unit[][];
  turnGenerator: TurnGenerator;
  action: Action;
};

export class Game {
  static units: unit[][];
  static location: Location;

  static start(rowsCount: number, columnsCount: number): initialGameData {
    const randomizer = new Randomizer();
    const board = new Board(rowsCount, columnsCount);
    board.fillWithUnits(randomizer.generateFullBoardUnits(rowsCount, columnsCount));
    this.location = new Location(board);
    const action = new Action(this.location, board);
    this.units = board.getBoardMatrix();

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

  static case1(rowsCount: number, columnsCount: number): string {
    const randomizer = new Randomizer();
    const board = new Board(rowsCount, columnsCount);
    board.fillWithUnits(randomizer.generateFullBoardUnits(rowsCount, columnsCount));
    this.location = new Location(board);
    const action = new Action(this.location, board);
    const units = board.getBoardMatrix();
    units[0][2] = new Archimage();
    action.doAction(ActionType.defense, units[2][2] as Unit);
    action.doAction(ActionType.deal, units[0][2]);

    console.log('units', units);
    return 'kek';
  }
}
