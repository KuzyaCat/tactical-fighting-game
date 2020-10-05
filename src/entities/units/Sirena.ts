import { Unit } from './Unit';
import { Range, SingleTarget, Paralyzer } from './types';

export class Sirena extends Unit {
  constructor() {
    super('Sirena', 80, 20, 0, new Range(), new SingleTarget(), new Paralyzer());
  }
}
