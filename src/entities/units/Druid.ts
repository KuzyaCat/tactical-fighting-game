import { Unit } from './Unit';
import { Range } from './types/range-type/Range';
import { Healer } from './types/deal-type/Healer';
import { MassTarget } from './types';

export class Druid extends Unit {
  constructor(name: string, hp: number, initiative: number, dealValue: number) {
    super(name, hp, initiative, dealValue, new Range(), new MassTarget(), new Healer());
  }
}
