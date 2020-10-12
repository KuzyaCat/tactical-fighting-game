import { Unit } from './Unit';
import { Range, SingleTarget, Healer } from './types';

export class Monk extends Unit {
  constructor() {
    super('Monk', 70, 20, 40, new Range(), new SingleTarget(), new Healer());
  }
}
