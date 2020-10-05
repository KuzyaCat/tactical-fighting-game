import { Unit } from './Unit';
import { Paralyzer, Range } from './types';
import { SingleTarget } from './types/deal-count/SingleTarget';

export class ParalyzerCreep extends Unit {
  constructor(name: string, hp: number, initiative: number, dealValue: number) {
    super(name, hp, initiative, dealValue, new Range(), new SingleTarget(), new Paralyzer());
  }
}
