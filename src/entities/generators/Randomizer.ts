import { Unit, Skeleton, Centaur, Bandit, ElfArcher, SkeletonMage, Archimage, Monk, Bishop, Sirena } from '../units';

export class Randomizer {
  uniqueUnitList: Unit[];

  constructor() {
    this.uniqueUnitList = [
      new Skeleton(),
      new Centaur(),
      new Bandit(),
      new ElfArcher(),
      new SkeletonMage(),
      new Archimage(),
      new Monk(),
      new Bishop(),
      new Sirena(),
    ];
  }

  generateListSequance(unitsList: Unit[]): Unit[] {
    for (let i = unitsList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [unitsList[i], unitsList[j]] = [unitsList[j], unitsList[i]];
    }
    return unitsList;
  }

  generateIndex(): number {
    return Math.floor(Math.random() * (this.uniqueUnitList.length - 1));
  }

  generateUnit(): Unit {
    return this.uniqueUnitList[this.generateIndex()];
  }

  generateFullBoardUnits(rowsCount: number, columnsCount: number): Unit[][] {
    const matrix: Unit[][] = [];
    for (let i = 0; i < rowsCount; i += 1) {
      const row: Unit[] = [];
      for (let j = 0; j < columnsCount; j += 1) {
        row.push(this.generateUnit());
      }
      matrix.push(row);
    }

    return matrix;
  }
}
