import { Unit } from './Unit';
import { Melee, SingleTarget, Damager } from './types';

export class Bandit extends Unit {
  constructor() {
    super('Bandit', 45, 60, 30, new Melee(), new SingleTarget(), new Damager());
  }
}
