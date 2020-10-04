import { Unit } from './Unit';
import { Melee } from './types/Melee';

export class Creep extends Unit {
  constructor(name: string, hp: number, initiative: number) {
    super(name, hp, initiative, new Melee());
  }
}
