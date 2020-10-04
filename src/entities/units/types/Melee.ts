import { IAttackRange } from './IAttackRange';
import { boardLocation, Team } from '../../types';
import { Location } from '../../board';

export class Melee implements IAttackRange {
  getPossibleAims(unitBoardLocation: boardLocation, location: Location): boardLocation[] | null {
    const adjacentEnemiesLocation = location.getAdjacentEnemiesLocation(unitBoardLocation);

    console.log('unitBoardLocation', unitBoardLocation);
    console.log('adjacentEnemiesLocation', adjacentEnemiesLocation);
    console.log('location.getNearestLineEnemiesLocation(unitBoardLocation)', location.getNearestLineEnemiesLocation(unitBoardLocation));

    if (adjacentEnemiesLocation.length) {
      return adjacentEnemiesLocation;
    }

    const unitTeam: Team | null = location.getTeamOfUnit(unitBoardLocation);
    console.log('unitTeam', unitTeam);
    console.log('location.getTeamOfNextLine(unitBoardLocation)', location.getTeamOfNextLine(unitBoardLocation));
    if (unitTeam && unitTeam === location.getTeamOfNextLine(unitBoardLocation)) {
      return [];
    }

    const nearestLineEnemiesLocation: boardLocation[] | null = location.getNearestLineEnemiesLocation(
      unitBoardLocation,
    );
    if (nearestLineEnemiesLocation) {
      return nearestLineEnemiesLocation;
    }

    return [];
  }
}
