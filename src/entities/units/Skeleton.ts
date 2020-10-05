import { Unit } from './Unit';
import { Melee, SingleTarget, Damager } from './types';

export class Skeleton extends Unit {
  constructor() {
    super('Skeleton', 100, 50, 25, new Melee(), new SingleTarget(), new Damager());
  }
}
