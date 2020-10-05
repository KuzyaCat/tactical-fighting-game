import { Location } from './Location';
import { Board } from './Board';
import { Unit } from '../units';
import { boardLocation, unit } from '../types';
import { SingleTarget, MassTarget } from '../units';

export class Action {
  private location: Location;
  private board: Board;

  constructor(location: Location, board: Board) {
    this.location = location;
    this.board = board;
  }

  killUnit(boardLocation: boardLocation): void {
    this.board.setUnit(boardLocation, null);
  }

  checkAndRemoveDeadUnits(enemiesBoardLocations: boardLocation[]): void {
    enemiesBoardLocations.forEach((e) => {
      const enemyUnit: unit = this.location.getUnitByLocation(e);
      if (enemyUnit && enemyUnit.getHp() <= 0) {
        this.killUnit(e);
      }
    });
  }

  deal(unit: Unit, enemiesBoardLocations: boardLocation[]): void {
    const unitBoardLocation = this.location.getUnitBoardLocation(unit);
    if (unitBoardLocation && unit.getDealCount() instanceof SingleTarget) {
      enemiesBoardLocations.forEach((e) => unit.deal(unitBoardLocation, this.location, e));
    } else if (unitBoardLocation && unit.getDealCount() instanceof MassTarget) {
      unit.deal(unitBoardLocation, this.location);
    }
    this.checkAndRemoveDeadUnits(enemiesBoardLocations);
  }
}
