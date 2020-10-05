import { boardLocation } from '../../../types';
import { Location } from '../../../board';

export interface IAttackRange {
  getPossibleTargets(unitBoardLocation: boardLocation, location: Location): boardLocation[];
}
