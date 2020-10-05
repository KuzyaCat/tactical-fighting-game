import { Unit } from './Unit';
import { Range } from './types/range-type/Range';
import { Healer } from './types/deal-type/Healer';
import { SingleTarget } from './types/deal-count/SingleTarget';

export class HealerCreep extends Unit {
  constructor(name: string, hp: number, initiative: number, dealValue: number) {
    super(name, hp, initiative, dealValue, new Range(), new SingleTarget(), new Healer());
  }
}
