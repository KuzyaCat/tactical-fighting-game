import { IAttackRange } from './IAttackRange';
import { boardLocation, Team } from '../../../../types';
import { Location } from '../../../board';

export class Melee implements IAttackRange {
  getPossibleTargets(unitBoardLocation: boardLocation, location: Location): boardLocation[] {
    const adjacentEnemiesLocation = location.getAdjacentEnemiesLocation(unitBoardLocation);

    if (adjacentEnemiesLocation.length) {
      return adjacentEnemiesLocation;
    }

    const unitTeam: Team | null = location.getTeamOfUnit(unitBoardLocation);
    if (unitTeam && unitTeam === location.getTeamOfNextLine(unitBoardLocation)) {
      console.log('unitTeam && unitTeam === location.getTeamOfNextLine(unitBoardLocation)');
      return [];
    }

    const nearestLineEnemiesLocation: boardLocation[] | null = location.getNearestLineEnemiesLocation(
      unitBoardLocation,
    );
    console.log(
      'current unit board location',
      unitBoardLocation,
      'location.getNearestLineEnemiesLocation(unitBoardLocation)',
      location.getNearestLineEnemiesLocation(unitBoardLocation),
    );
    console.log('nearestLineEnemiesLocation', nearestLineEnemiesLocation);
    if (nearestLineEnemiesLocation) {
      console.log('return nearestLineEnemiesLocation');
      return nearestLineEnemiesLocation;
    }

    return [];
  }
}
