import { Board, Location, Action } from './board';
import { Unit, Skeleton } from './units';
import { boardLocation, unit } from './types';
import { Randomizer } from './generators';

export class Game {
  static case1(rowsCount: number, columnsCount: number): string {
    const randomizer = new Randomizer();
    const units = randomizer.generateFullBoardUnits(rowsCount, columnsCount);
    console.log(units);
    if (units) {
      return JSON.stringify(units);
    }
    return 'null';
  }
}
