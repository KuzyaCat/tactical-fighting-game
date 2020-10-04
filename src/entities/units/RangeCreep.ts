import { Unit } from './Unit';
import { Range } from './types';

export class RangeCreep extends Unit {
  constructor(name: string, hp: number, initiative: number) {
    super(name, hp, initiative, new Range());
  }
}
