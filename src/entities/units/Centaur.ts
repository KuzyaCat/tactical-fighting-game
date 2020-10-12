import { Unit } from './Unit';
import { Melee, SingleTarget, Damager } from './types';

export class Centaur extends Unit {
  constructor() {
    super('Centaur', 150, 50, 50, new Melee(), new SingleTarget(), new Damager());
  }
}
