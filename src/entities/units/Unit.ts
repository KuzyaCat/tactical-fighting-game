import { IAttackRange } from './types/IAttackRange';
import { boardLocation } from '../types';
import { Location } from '../board';

export class Unit {
  private name: string;
  private hp: number;
  private initiative: number;
  private attackRangeType: IAttackRange;

  constructor(name: string, hp: number, initiative: number, attackRangeType: IAttackRange) {
    this.hp = hp;
    this.initiative = initiative;
    this.name = name;
    this.attackRangeType = attackRangeType;
  }

  getPossibleAims(boardLocation: boardLocation, location: Location): boardLocation[] | null {
    return this.attackRangeType.getPossibleAims(boardLocation, location);
  }

  getName(): string {
    return this.name;
  }

  getHp(): number {
    return this.hp;
  }

  getInitiative(): number {
    return this.initiative;
  }
}
