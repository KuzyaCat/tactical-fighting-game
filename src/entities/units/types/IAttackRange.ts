import { boardLocation } from '../../types';
import { Location } from '../../board';

export interface IAttackRange {
  getPossibleAims(unitBoardLocation: boardLocation, location: Location): boardLocation[] | null;
}
