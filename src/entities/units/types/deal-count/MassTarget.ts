import { IDealCount } from './IDealCount';
import { boardLocation } from '../../../types';

export class MassTarget implements IDealCount {
  getTargets(possibleTargets: boardLocation[]): boardLocation[] {
    return possibleTargets;
  }
}
