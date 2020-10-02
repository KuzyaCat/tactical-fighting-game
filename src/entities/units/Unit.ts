import { unitType } from '../types';

export class Unit {
  hp: number;
  initiative: number;
  type: unitType;

  constructor(hp: number, initiative: number, type: unitType) {
    this.hp = hp;
    this.initiative = initiative;
    this.type = type;
  }
}
