import { Unit } from './Unit';
import { Range, Damager, MassTarget } from './types';

export class Archimage extends Unit {
  constructor() {
    super('Archimage', 90, 40, 40, new Range(), new MassTarget(), new Damager());
  }
}
