import { Board, Location, Action } from './board';
import { Unit, Skeleton } from './units';
import { boardLocation, unit } from './types';

export class Game {
  static case1(rowsCount: number, columnsCount: number): string {
    const board = new Board(rowsCount, columnsCount);
    const location: Location = new Location(board);

    const units: Unit[][] = Array<Array<Unit>>(rowsCount);
    for (let i = 0; i < rowsCount; i += 1) {
      const unitsRow = Array<Unit>(columnsCount);
      for (let j = 0; j < columnsCount; j += 1) {
        unitsRow[j] = new Skeleton();
      }
      units[i] = unitsRow;
    }
    board.fillWithUnits(units);

    const unitBoardLocation: boardLocation = {
      rowIndex: 0,
      columnIndex: 1,
    };

    const unit = location.getUnitByLocation(unitBoardLocation);
    if (unit) {
      return JSON.stringify(unit.getPossibleTargets(unitBoardLocation, location));
    }
    return 'null';
  }
}
