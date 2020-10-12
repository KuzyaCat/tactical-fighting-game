import { Unit } from './Unit';
import { Range, Damager, MassTarget } from './types';

export class SkeletonMage extends Unit {
  constructor() {
    super('Skeleton Mage', 50, 40, 20, new Range(), new MassTarget(), new Damager());
  }
}
