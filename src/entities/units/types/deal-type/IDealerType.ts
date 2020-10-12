import { boardLocation } from '../../../../types';
import { Location } from '../../../board';
import { Unit } from '../../Unit';

export interface IDealerType {
  deal(unit: Unit, enemiesBoardLocations: boardLocation[], location: Location): Unit[];
}
