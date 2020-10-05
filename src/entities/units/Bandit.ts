import { Unit } from './Unit';
import { Range, SingleTarget, Damager } from './types';

export class Bandit extends Unit {
  constructor() {
    super('Bandit', 45, 60, 30, new Range(), new SingleTarget(), new Damager());
  }
}
