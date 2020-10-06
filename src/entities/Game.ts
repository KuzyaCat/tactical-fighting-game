import { Board, Location, Action } from './board';
import { Unit } from './units';
import { boardLocation, unit } from './types';
import { Randomizer, TurnGenerator } from './generators';

export class Game {
  static case1(rowsCount: number, columnsCount: number): string {
    const randomizer = new Randomizer();
    const units: Unit[][] = randomizer.generateFullBoardUnits(rowsCount, columnsCount);
    const turnGenerator = new TurnGenerator(units, randomizer);
    const sequence: Unit[] = turnGenerator.getUnitSequence();
    console.log(sequence);
    for (let i = 0; i < 16; i += 1) {
      console.log(turnGenerator.next());
    }
    if (units) {
      return JSON.stringify(sequence);
    }
    return 'null';
  }
}
