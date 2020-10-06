import { Location } from './Location';
import { Board } from './Board';
import { Unit } from '../units';
import { boardLocation, unit, ActionType } from '../../types';
import { SingleTarget, MassTarget } from '../units';
import { act } from 'react-dom/test-utils';

export class Action {
  private location: Location;
  private board: Board;

  constructor(location: Location, board: Board) {
    this.location = location;
    this.board = board;
  }

  doAction(action: ActionType, unit: Unit): void | ((targetEnemyBoardLocation: boardLocation) => void) {
    console.log(action);
    switch (action) {
      case ActionType.deal:
        return this.deal(unit);
      case ActionType.defense:
        this.defense(unit);
        break;
      default:
        throw new Error('There is no such an action');
    }
  }

  private killUnit(boardLocation: boardLocation): void {
    this.board.setUnit(boardLocation, null);
  }

  private checkAndRemoveDeadUnits(enemiesBoardLocations: boardLocation[]): void {
    enemiesBoardLocations.forEach((e) => {
      const enemyUnit: unit = this.location.getUnitByLocation(e);
      if (enemyUnit && enemyUnit.getHp() <= 0) {
        this.killUnit(e);
      }
    });
  }

  private dealSingleTarget(unit: Unit, targetEnemyBoardLocation: boardLocation): void {
    const unitBoardLocation = this.location.getUnitBoardLocation(unit);
    if (unitBoardLocation) {
      unit.deal(unitBoardLocation, this.location, targetEnemyBoardLocation);
    }
  }

  private dealAllTargets(unit: Unit) {
    const unitBoardLocation = this.location.getUnitBoardLocation(unit);
    unit.deal(unitBoardLocation as boardLocation, this.location);
  }

  private deal(unit: Unit): void | ((targetEnemyBoardLocation: boardLocation) => void) {
    const unitBoardLocation = this.location.getUnitBoardLocation(unit);

    if (unitBoardLocation && unit.getDealCount() instanceof SingleTarget) {
      return (targetEnemyBoardLocation: boardLocation) => {
        this.dealSingleTarget(unit, targetEnemyBoardLocation);
        this.checkAndRemoveDeadUnits(
          this.location.getAllEnemiesLocation(this.location.getUnitBoardLocation(unit) as boardLocation),
        );
      };
    } else if (unitBoardLocation && unit.getDealCount() instanceof MassTarget) {
      this.dealAllTargets(unit);
      this.checkAndRemoveDeadUnits(
        this.location.getAllEnemiesLocation(this.location.getUnitBoardLocation(unit) as boardLocation),
      );
    }
  }

  private defense(unit: Unit): void {
    unit.setIsDefending(true);
  }
}
