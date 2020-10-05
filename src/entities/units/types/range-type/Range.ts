import { IAttackRange } from './IAttackRange';
import { boardLocation } from '../../../types';
import { Location } from '../../../board';
import { Healer } from '../deal-type/Healer';

export class Range implements IAttackRange {
  getPossibleTargets(unitBoardLocation: boardLocation, location: Location): boardLocation[] {
    const unit = location.getUnitByLocation(unitBoardLocation);
    return unit && unit.getDealerType() instanceof Healer
      ? location.getAllAlliesLocation(unitBoardLocation)
      : location.getAllEnemiesLocation(unitBoardLocation);
  }
}
