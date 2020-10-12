import { IDealerType } from './IDealerType';
import { Unit } from '../../Unit';
import { Location } from '../../../board';
import { boardLocation, unit } from '../../../../types';

export class Damager implements IDealerType {
  deal(unit: Unit, enemiesBoardLocations: boardLocation[], location: Location): Unit[] {
    const damagedUnits: Unit[] = [];
    enemiesBoardLocations.forEach((enemyBoardLocation) => {
      const enemy: unit = location.getUnitByLocation(enemyBoardLocation);
      if (enemy) {
        const restHp = enemy.getIsDefending()
          ? enemy.getHp() - 0.5 * unit.getDealValue()
          : enemy.getHp() - unit.getDealValue();
        enemy.setHp(restHp);
        damagedUnits.push(enemy);
      }
    });

    return damagedUnits;
  }
}
