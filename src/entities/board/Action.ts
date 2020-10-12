import { Location } from './Location';
import { Board } from './Board';
import { Unit } from '../units';
import { boardLocation, unit, ActionType } from '../../types';
import { SingleTarget, MassTarget } from '../units';
import { TurnGenerator } from '../generators';

export class Action {
  private location: Location;
  private board: Board;
  private turnGenerator: TurnGenerator;

  constructor(location: Location, board: Board, turnGenerator: TurnGenerator) {
    this.location = location;
    this.board = board;
    this.turnGenerator = turnGenerator;
  }

  doAction(
    action: ActionType,
    unit: Unit,
    targetBoardLocation?: boardLocation,
  ): void | ((targetEnemyBoardLocation: boardLocation) => void) {
    switch (action) {
      case ActionType.deal:
        const dealAction = this.deal(unit);
        if (!(unit.getDealCount() instanceof MassTarget) && dealAction && targetBoardLocation) {
          dealAction(targetBoardLocation);
        }
        this.turnGenerator.next();
        break;
      case ActionType.defense:
        this.defense(unit);
        this.turnGenerator.next();
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

  getPossibleTargetsOfUnit(unit: Unit): unit[] {
    return unit
      .getPossibleTargets(this.location.getUnitBoardLocation(unit) as boardLocation, this.location)
      .map((loc) => this.location.getUnitByLocation(loc));
  }

  getBoardLocationOfTarget(unit: Unit): boardLocation | null {
    return this.location.getUnitBoardLocation(unit);
  }
}
