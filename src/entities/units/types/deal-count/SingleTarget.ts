import { IDealCount } from './IDealCount';
import { boardLocation } from '../../../../types';

export class SingleTarget implements IDealCount {
  getTargets(possibleTargets: boardLocation[], targetLocation: boardLocation | undefined): boardLocation[] {
    if (
      targetLocation &&
      possibleTargets.findIndex(
        (t) => t.rowIndex === targetLocation.rowIndex && t.columnIndex === targetLocation.columnIndex,
      ) !== -1
    ) {
      return [targetLocation];
    }

    return [];
  }
}
