import { Unit } from '../entities/units';
import { TurnGenerator } from '../entities/generators';
import { Action } from '../entities/board';

export type boardLocation = {
  rowIndex: number;
  columnIndex: number;
};

export enum Team {
  topTeam = 'TOP_TEAM',
  bottomTeam = 'BOTTOM_TEAM',
}

export type unit = Unit | null;

export enum ActionType {
  deal = 'DEAL',
  defense = 'DEFENSE',
}

export type turnGenerator = InstanceType<typeof TurnGenerator>;
export type action = InstanceType<typeof Action>;
