import { Board, Location, Action } from './board';
import { Unit } from './units';
import { Creep } from './units/Creep';
import { RangeCreep } from './units/RangeCreep';
import { Mage } from './units/Mage';
import { Druid } from './units/Druid';
import { HealerCreep } from './units/HealerCreep';
import { boardLocation, unit } from './types';

export class Game {
  static case1(rowsCount: number, columnsCount: number): string {
    const board = new Board(rowsCount, columnsCount);
    const location: Location = new Location(board);

    const units: Unit[][] = Array<Array<Unit>>(rowsCount);
    for (let i = 0; i < rowsCount; i += 1) {
      const unitsRow = Array<Unit>(columnsCount);
      for (let j = 0; j < columnsCount; j += 1) {
        unitsRow[j] = new Creep('kek', 100, 20, 20);
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

  static case2(rowsCount: number, columnsCount: number): string {
    const board = new Board(rowsCount, columnsCount);
    const location: Location = new Location(board);

    const units: (Unit | null)[][] = Array<Array<Unit>>(rowsCount);
    for (let i = 0; i < rowsCount; i += 1) {
      const unitsRow = Array<Unit>(columnsCount);
      for (let j = 0; j < columnsCount; j += 1) {
        unitsRow[j] = new Creep('kek', 100, 20, 20);
      }
      units[i] = unitsRow;
    }
    board.fillWithUnits(units);

    units[2][1] = null;

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

  static case3(rowsCount: number, columnsCount: number): string {
    const board = new Board(rowsCount, columnsCount);
    const location: Location = new Location(board);

    const units: Unit[][] = Array<Array<Unit>>(rowsCount);
    for (let i = 0; i < rowsCount; i += 1) {
      const unitsRow = Array<Unit>(columnsCount);
      for (let j = 0; j < columnsCount; j += 1) {
        unitsRow[j] = new RangeCreep('kek', 100, 20, 20);
      }
      units[i] = unitsRow;
    }
    board.fillWithUnits(units);

    const unitBoardLocation: boardLocation = {
      rowIndex: 2,
      columnIndex: 1,
    };

    const unit = location.getUnitByLocation(unitBoardLocation);
    if (unit) {
      return JSON.stringify(unit.getPossibleTargets(unitBoardLocation, location));
    }
    return 'null';
  }

  static case4(rowsCount: number, columnsCount: number): string {
    const board = new Board(rowsCount, columnsCount);
    const location: Location = new Location(board);

    const units: (Unit | null)[][] = Array<Array<Unit>>(rowsCount);
    for (let i = 0; i < rowsCount; i += 1) {
      const unitsRow = Array<Unit>(columnsCount);
      for (let j = 0; j < columnsCount; j += 1) {
        unitsRow[j] = new RangeCreep('kek', 100, 20, 20);
      }
      units[i] = unitsRow;
    }
    board.fillWithUnits(units);

    units[2][1] = null;
    units[2][0] = null;
    units[2][2] = null;
    units[3][1] = null;

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

  static case5(rowsCount: number, columnsCount: number): string {
    const board = new Board(rowsCount, columnsCount);
    const location: Location = new Location(board);
    const action: Action = new Action(location, board);

    const units: (Unit | null)[][] = Array<Array<Unit>>(rowsCount);
    for (let i = 0; i < rowsCount; i += 1) {
      const unitsRow = Array<Unit>(columnsCount);
      if (i === 0) {
        for (let j = 0; j < columnsCount; j += 1) {
          unitsRow[j] = new RangeCreep('kek', 100, 20, 20);
          units[i] = unitsRow;
        }
        continue;
      }
      for (let j = 0; j < columnsCount; j += 1) {
        unitsRow[j] = new Creep('kek', 100, 20, 20);
      }
      units[i] = unitsRow;
    }
    board.fillWithUnits(units);

    const enemyBoardLocation = {
      rowIndex: 2,
      columnIndex: 1,
    };

    console.log(board.getBoardMatrix());
    for (let i = 0; i < 5; i += 1) {
      action.deal(units[0][1] as Unit, [enemyBoardLocation]);
    }
    console.log(board.getBoardMatrix());

    return JSON.stringify(board.getBoardMatrix());
  }

  static case6(rowsCount: number, columnsCount: number): string {
    const board = new Board(rowsCount, columnsCount);
    const location: Location = new Location(board);
    const action: Action = new Action(location, board);

    const units: unit[][] = Array<Array<Unit>>(rowsCount);
    for (let i = 0; i < rowsCount; i += 1) {
      const unitsRow = Array<Unit>(columnsCount);
      if (i === 0) {
        for (let j = 0; j < columnsCount; j += 1) {
          unitsRow[j] = new RangeCreep('kek', 100, 20, 20);
          units[i] = unitsRow;
        }
        continue;
      }
      for (let j = 0; j < columnsCount; j += 1) {
        unitsRow[j] = new Creep('kek', 100, 20, 20);
      }
      units[i] = unitsRow;
    }
    units[0][2] = new Mage('kek', 100, 40, 40);
    units[2][2] = null;
    board.fillWithUnits(units);

    const attacker = units[0][2];
    console.log(board.getBoardMatrix());
    if (attacker) {
      action.deal(
        attacker as Unit,
        attacker.getPossibleTargets(location.getUnitBoardLocation(attacker) as boardLocation, location),
      );
    }
    console.log(board.getBoardMatrix());

    return JSON.stringify(board.getBoardMatrix());
  }

  static case7(rowsCount: number, columnsCount: number): string {
    const board = new Board(rowsCount, columnsCount);
    const location: Location = new Location(board);
    const action: Action = new Action(location, board);

    const units: unit[][] = Array<Array<Unit>>(rowsCount);
    for (let i = 0; i < rowsCount; i += 1) {
      const unitsRow = Array<Unit>(columnsCount);
      if (i === 0) {
        for (let j = 0; j < columnsCount; j += 1) {
          unitsRow[j] = new RangeCreep('kek', 100, 20, 20);
          units[i] = unitsRow;
        }
        continue;
      }
      for (let j = 0; j < columnsCount; j += 1) {
        unitsRow[j] = new Creep('kek', 100, 20, 20);
      }
      units[i] = unitsRow;
    }
    units[0][2] = new Druid('kek', 100, 10, 10);
    units[3][2] = new Mage('kek', 100, 40, 40);
    units[2][2] = null;
    board.fillWithUnits(units);

    const attacker = units[3][2];
    const healer = units[0][2];
    console.log(board.getBoardMatrix());
    if (attacker) {
      action.deal(
        attacker as Unit,
        attacker.getPossibleTargets(location.getUnitBoardLocation(attacker) as boardLocation, location),
      );
    }
    if (healer) {
      action.deal(
        healer as Unit,
        healer.getPossibleTargets(location.getUnitBoardLocation(healer) as boardLocation, location),
      );
    }
    console.log(board.getBoardMatrix());

    return JSON.stringify(board.getBoardMatrix());
  }

  static case8(rowsCount: number, columnsCount: number): string {
    const board = new Board(rowsCount, columnsCount);
    const location: Location = new Location(board);
    const action: Action = new Action(location, board);

    const units: unit[][] = Array<Array<Unit>>(rowsCount);
    for (let i = 0; i < rowsCount; i += 1) {
      const unitsRow = Array<Unit>(columnsCount);
      if (i === 0) {
        for (let j = 0; j < columnsCount; j += 1) {
          unitsRow[j] = new RangeCreep('kek', 100, 20, 20);
          units[i] = unitsRow;
        }
        continue;
      }
      for (let j = 0; j < columnsCount; j += 1) {
        unitsRow[j] = new Creep('kek', 100, 20, 20);
      }
      units[i] = unitsRow;
    }
    units[0][2] = new HealerCreep('kek', 100, 10, 10);
    units[3][2] = new Mage('kek', 100, 40, 40);
    units[2][2] = null;
    board.fillWithUnits(units);

    const allyLocation = {
      rowIndex: 3,
      columnIndex: 1,
    };

    const attacker = units[3][2];
    const rangeAttacker = units[0][1];
    const healer = units[0][2];
    console.log(board.getBoardMatrix());
    if (attacker) {
      action.deal(
        attacker as Unit,
        attacker.getPossibleTargets(location.getUnitBoardLocation(attacker) as boardLocation, location),
      );
    }
    if (rangeAttacker) {
      action.deal(rangeAttacker as Unit, [allyLocation]);
    }
    if (healer) {
      action.deal(healer as Unit, [allyLocation]);
    }
    console.log(board.getBoardMatrix());

    return JSON.stringify(board.getBoardMatrix());
  }
}
