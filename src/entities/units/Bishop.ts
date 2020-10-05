import { Unit } from './Unit';
import { Range, MassTarget, Healer } from './types';

export class Bishop extends Unit {
  constructor() {
    super('Bishop', 130, 20, 25, new Range(), new MassTarget(), new Healer());
  }
}
