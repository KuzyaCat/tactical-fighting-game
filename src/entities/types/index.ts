import { Unit } from '../units';

export type boardLocation = {
  rowIndex: number;
  columnIndex: number;
};

export enum Team {
  topTeam = 'TOP_TEAM',
  bottomTeam = 'BOTTOM_TEAM',
}

export type unit = Unit | null;
