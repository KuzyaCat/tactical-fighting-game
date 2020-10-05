import { Unit } from './Unit';
import { Range } from './types';
import { Damager } from './types/deal-type/Damager';
import { MassTarget } from './types';

export class Mage extends Unit {
  constructor(name: string, hp: number, initiative: number, dealValue: number) {
    super(name, hp, initiative, dealValue, new Range(), new MassTarget(), new Damager());
  }
}
