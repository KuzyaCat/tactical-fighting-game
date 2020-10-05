import { Unit } from './Unit';
import { Melee } from './types/range-type/Melee';
import { Damager } from './types/deal-type/Damager';
import { SingleTarget } from './types/deal-count/SingleTarget';

export class Creep extends Unit {
  constructor(name: string, hp: number, initiative: number, dealValue: number) {
    super(name, hp, initiative, dealValue, new Melee(), new SingleTarget(), new Damager());
  }
}
