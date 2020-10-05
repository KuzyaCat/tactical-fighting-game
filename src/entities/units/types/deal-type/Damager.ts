import { IDealerType } from './IDealerType';
import { Unit } from '../../Unit';
import { Location } from '../../../board';
import { boardLocation, unit } from '../../../types';

export class Damager implements IDealerType {
  deal(unit: Unit, enemiesBoardLocations: boardLocation[], location: Location): Unit[] {
    const damagedUnits: Unit[] = [];
    enemiesBoardLocations.forEach((enemyBoardLocation) => {
      const enemy: unit = location.getUnitByLocation(enemyBoardLocation);
      if (enemy) {
        enemy.setHp(enemy.getHp() - unit.getDealValue());
        damagedUnits.push(enemy);
      }
    });

    return damagedUnits;
  }
}
