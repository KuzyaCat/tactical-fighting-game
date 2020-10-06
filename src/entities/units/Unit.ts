import { IAttackRange } from './types/range-type/IAttackRange';
import { IDealCount } from './types/deal-count/IDealCount';
import { IDealerType } from './types/deal-type/IDealerType';
import { boardLocation } from '../types';
import { Location } from '../board';

export class Unit {
  private name: string;
  private hp: number;
  private maxHp: number;
  private initiative: number;
  private originInitiative: number;
  private dealValue: number;
  private AttackRangeType: IAttackRange;
  private DealCount: IDealCount;
  private DealerType: IDealerType;

  constructor(
    name: string,
    hp: number,
    initiative: number,
    dealValue: number,
    AttackRangeType: IAttackRange,
    DealCount: IDealCount,
    DealerType: IDealerType,
  ) {
    this.hp = hp;
    this.maxHp = hp;
    this.initiative = initiative;
    this.originInitiative = initiative;
    this.name = name;
    this.dealValue = dealValue;
    this.AttackRangeType = AttackRangeType;
    this.DealCount = DealCount;
    this.DealerType = DealerType;
  }

  getPossibleTargets(boardLocation: boardLocation, location: Location): boardLocation[] {
    return this.AttackRangeType.getPossibleTargets(boardLocation, location);
  }

  getTargets(
    boardLocation: boardLocation,
    location: Location,
    enemyBoardLocation: boardLocation | undefined,
  ): boardLocation[] {
    return this.DealCount.getTargets(this.getPossibleTargets(boardLocation, location), enemyBoardLocation);
  }

  deal(
    boardLocation: boardLocation,
    location: Location,
    enemyBoardLocation: boardLocation | undefined = undefined,
  ): Unit[] {
    return this.DealerType.deal(this, this.getTargets(boardLocation, location, enemyBoardLocation), location);
  }

  getName(): string {
    return this.name;
  }

  getHp(): number {
    return this.hp;
  }

  getMaxHp(): number {
    return this.maxHp;
  }

  getDealValue(): number {
    return this.dealValue;
  }

  getInitiative(): number {
    return this.initiative;
  }

  getOriginInitiative(): number {
    return this.originInitiative;
  }

  getDealCount(): IDealCount {
    return this.DealCount;
  }

  getDealerType(): IDealerType {
    return this.DealerType;
  }

  setHp(value: number): void {
    this.hp = value;
  }

  setInitiative(value: number): void {
    this.initiative = value;
  }
}
