import { Unit } from './Unit';
import { Range, SingleTarget, Damager } from './types';

export class ElfArcher extends Unit {
  constructor() {
    super('Elf Archer', 90, 60, 40, new Range(), new SingleTarget(), new Damager());
  }
}
