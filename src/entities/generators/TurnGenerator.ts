import { Randomizer } from './Randomizer';
import { Unit } from '../units/Unit';
import { unit } from '../../types';

export class TurnGenerator {
  private unitSequance: Unit[];
  turn: Generator<Unit>;
  private currentUnit: Unit;

  constructor(units: unit[][], randomizer: Randomizer) {
    this.unitSequance = this.splitByEqualInitiative(
      units.filter((u) => u) as Unit[][],
    ).reduce((accumulator, currentArray) => [...accumulator, ...randomizer.shuffleListSequance(currentArray)]);
    this.turn = this.turnGenerator();
    this.currentUnit = this.unitSequance[0];
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *turnGenerator() {
    while (true) {
      yield* this.unitSequance;
    }
  }

  private skipCurrentUnit(): boolean {
    return !this.currentUnit || this.currentUnit.getHp() <= 0 || this.currentUnit.getInitiative() <= 0;
  }

  private getFilterCondition(u: Unit): boolean {
    return u && u.getHp() > 0 && u.getInitiative() > 0;
  }

  next(): Unit {
    this.currentUnit = this.turn.next().value;

    while (this.currentUnit?.getInitiative() <= 0) {
      this.clearCurrentUnitParalyzation();
      this.currentUnit = this.turn.next().value;
    }

    while (this.skipCurrentUnit()) {
      this.currentUnit = this.turn.next().value;
    }

    if (this.currentUnit === this.unitSequance.filter(this.getFilterCondition)[0]) {
      this.clearEffects();
    }

    return this.currentUnit;
  }

  getUnitSequence(): Unit[] {
    return this.unitSequance.filter((u) => this.getFilterCondition(u));
  }

  getCurrentUnit(): Unit {
    return this.currentUnit;
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

  private clearCurrentUnitParalyzation(): void {
    this.currentUnit.setInitiative(this.currentUnit.getOriginInitiative());
  }

  private clearEffects(): void {
    this.unitSequance
      .filter((u) => u && u.getHp() > 0)
      .forEach((u) => {
        u.setIsDefending(false);
      });
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
