import { Unit } from './Unit';
import { Range } from './types';
import { Damager } from './types/deal-type/Damager';
import { SingleTarget } from './types/deal-count/SingleTarget';

export class RangeCreep extends Unit {
  constructor(name: string, hp: number, initiative: number, dealValue: number) {
    super(name, hp, initiative, dealValue, new Range(), new SingleTarget(), new Damager());
  }
}
