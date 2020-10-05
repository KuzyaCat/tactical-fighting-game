import { boardLocation } from '../../../types';

export interface IDealCount {
  getTargets(possibleTargets: boardLocation[], targetLocation: boardLocation | undefined): boardLocation[];
}
