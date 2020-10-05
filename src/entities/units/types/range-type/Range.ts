import { IAttackRange } from './IAttackRange';
import { boardLocation } from '../../../types';
import { Location } from '../../../board';

export class Range implements IAttackRange {
  getPossibleTargets(unitBoardLocation: boardLocation, location: Location): boardLocation[] {
    return location.getAllEnemiesLocation(unitBoardLocation);
  }
}