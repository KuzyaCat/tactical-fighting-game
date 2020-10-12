import { IDealerType } from './IDealerType';
import { Unit } from '../../Unit';
import { Location } from '../../../board';
import { boardLocation, unit } from '../../../../types';

export class Healer implements IDealerType {
  deal(unit: Unit, unitsBoardLocations: boardLocation[], location: Location): Unit[] {
    const healedUnits: Unit[] = [];
    unitsBoardLocations.forEach((boardLocation) => {
      const healedUnit: unit = location.getUnitByLocation(boardLocation);
      if (healedUnit) {
        const hpAfterHeal: number =
          healedUnit.getHp() + unit.getDealValue() > healedUnit.getMaxHp()
            ? healedUnit.getMaxHp()
            : healedUnit.getHp() + unit.getDealValue();
        healedUnit.setHp(hpAfterHeal);
        healedUnits.push(healedUnit);
      }
    });

    return healedUnits;
  }
}
