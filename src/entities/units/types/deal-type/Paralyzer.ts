import { IDealerType } from './IDealerType';
import { Unit } from '../../Unit';
import { Location } from '../../../board';
import { boardLocation, unit } from '../../../types';

export class Paralyzer implements IDealerType {
  deal(unit: Unit, enemiesBoardLocations: boardLocation[], location: Location): Unit[] {
    const damagedUnits: Unit[] = [];
    enemiesBoardLocations.forEach((enemyBoardLocation) => {
      const enemy: unit = location.getUnitByLocation(enemyBoardLocation);
      if (enemy) {
        enemy.setInitiative(0);
        damagedUnits.push(enemy);
      }
    });

    return damagedUnits;
  }
}
