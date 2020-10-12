import { Board, Location, Action } from './board';
import { Unit } from './units';
import { boardLocation, Team, unit } from '../types';
import { Randomizer, TurnGenerator } from './generators';

type initialGameData = {
  units: unit[][];
  turnGenerator: TurnGenerator;
  action: Action;
};

export class Game {
  static location: Location;
  static turnGenerator: TurnGenerator;

  static start(rowsCount: number, columnsCount: number): initialGameData {
    const randomizer = new Randomizer();
    const board = new Board(rowsCount, columnsCount);
    board.fillWithUnits(randomizer.generateFullBoardUnits(rowsCount, columnsCount));
    this.location = new Location(board);
    const units = board.getBoardMatrix();
    this.turnGenerator = new TurnGenerator(units, randomizer);
    const action = new Action(this.location, board, this.turnGenerator);

    return {
      units,
      turnGenerator: this.turnGenerator,
      action,
    };
  }

  static finish(currentUnit: Unit): { isFinished: boolean; currentTeam: Team } {
    return {
      isFinished: !this.location
        .getAllEnemiesLocation(this.location.getUnitBoardLocation(currentUnit) as boardLocation)
        .some((enemyLocation) => this.location.isAlive(enemyLocation)),
      currentTeam: this.location.getTeamOfUnit(this.location.getUnitBoardLocation(currentUnit) as boardLocation),
    };
  }
}
