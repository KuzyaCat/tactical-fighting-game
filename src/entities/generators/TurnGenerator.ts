import { Randomizer } from './Randomizer';
import { Unit } from '../units/Unit';

export class TurnGenerator {
  private unitSequance: Unit[];
  turn: Generator<Unit>;

  constructor(units: Unit[][], randomizer: Randomizer) {
    this.unitSequance = this.splitByEqualInitiative(units).reduce((accumulator, currentArray) => [
      ...accumulator,
      ...randomizer.shuffleListSequance(currentArray),
    ]);
    this.unitSequance[2].setInitiative(0);
    this.turn = this.turnGenerator(this.unitSequance);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *turnGenerator(sequence: Unit[]) {
    while (true) {
      yield* sequence;
    }
  }

  next(): Unit {
    const currentUnit = this.turn.next().value;
    if (!currentUnit.getInitiative()) {
      currentUnit.setInitiative(currentUnit.getOriginInitiative());
      return this.turn.next().value;
    }

    return currentUnit;
  }

  getUnitSequence(): Unit[] {
    return this.unitSequance;
  }

  private splitByEqualInitiative(units: Unit[][]): Unit[][] {
    const sortedUnitList = this.fromMatrixToSortedByInitiativeList(units);
    const splitedByEqualInitiativeArrays: Unit[][] = [];

    let tempArr = [];
    for (let i = sortedUnitList.length - 1; i >= 0; i -= 1) {
      if (
        i !== sortedUnitList.length - 1 &&
        sortedUnitList[i].getInitiative() !== sortedUnitList[i + 1].getInitiative()
      ) {
        splitedByEqualInitiativeArrays.push(tempArr);
        tempArr = [];
      }
      tempArr.push(sortedUnitList[i]);
      if (i === 0) {
        splitedByEqualInitiativeArrays.push(tempArr);
      }
    }

    return splitedByEqualInitiativeArrays;
  }

  private fromMatrixToSortedByInitiativeList(units: Unit[][]) {
    const list: Unit[] = [];
    units.forEach((row) => {
      row.forEach((unit) => {
        list.push(unit);
      });
    });

    return list.sort((a, b) => a.getInitiative() - b.getInitiative());
  }
}
