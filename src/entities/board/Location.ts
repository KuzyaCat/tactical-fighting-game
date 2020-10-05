import { Board } from './Board';
import { Unit } from '../units';
import { Team, boardLocation, unit } from '../types';

export class Location {
  private board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  getUnitBoardLocation(unit: Unit): boardLocation | null {
    let rowIndex = 0;
    let columnIndex = 0;
    let wasFound = false;

    this.board.getBoardMatrix().every((row) => {
      const index: number = row.findIndex((u) => u === unit);
      if (index === -1) {
        rowIndex += 1;
      } else {
        wasFound = true;
        columnIndex = index;
        return false;
      }
      return true;
    });

    if (wasFound) {
      return {
        rowIndex,
        columnIndex,
      };
    } else {
      return null;
    }
  }

  getUnitByLocation(boardLocation: boardLocation): unit {
    return this.board.getBoardMatrix()[boardLocation.rowIndex][boardLocation.columnIndex];
  }

  isAlive(boardLocation: boardLocation): boolean {
    return Boolean(this.board.getBoardMatrix()[boardLocation.rowIndex][boardLocation.columnIndex]);
  }

  private removeDeadUnits<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
  }

  getTeamOfUnit(unitBoardLocation: boardLocation): Team {
    return unitBoardLocation.rowIndex < Math.floor(this.board.getBoardMatrix().length / 2)
      ? Team.topTeam
      : Team.bottomTeam;
  }

  getAdjacentEnemiesLocation(unitBoardLocation: boardLocation): boardLocation[] {
    const team = this.getTeamOfUnit(unitBoardLocation);
    const valueChange: number = team === Team.topTeam ? 1 : -1;

    const adjacentUnitsLocation: boardLocation[] = [];

    const oppositeEnemyLocation = {
      rowIndex: unitBoardLocation.rowIndex + valueChange,
      columnIndex: unitBoardLocation.columnIndex,
    };

    const hasEnemiesNextLine: boolean =
      this.getTeamOfUnit({
        rowIndex: unitBoardLocation.rowIndex + valueChange,
        columnIndex: unitBoardLocation.columnIndex,
      }) !== team;

    const hasLeftEnemy: boolean = unitBoardLocation.columnIndex - 1 >= 0 && hasEnemiesNextLine;
    const hasRightEnemy: boolean =
      unitBoardLocation.columnIndex + 1 < this.board.getBoardMatrix().length && hasEnemiesNextLine;

    if (hasEnemiesNextLine) {
      if (this.isAlive(oppositeEnemyLocation)) {
        adjacentUnitsLocation.push(oppositeEnemyLocation);
      }
    }

    const leftEnemyLocation = {
      rowIndex: unitBoardLocation.rowIndex + valueChange,
      columnIndex: unitBoardLocation.columnIndex - 1,
    };
    const rightEnemyLocation = {
      rowIndex: unitBoardLocation.rowIndex + valueChange,
      columnIndex: unitBoardLocation.columnIndex + 1,
    };

    if (hasEnemiesNextLine && hasLeftEnemy && this.isAlive(leftEnemyLocation)) {
      adjacentUnitsLocation.push(leftEnemyLocation);
    }
    if (hasEnemiesNextLine && hasRightEnemy && this.isAlive(rightEnemyLocation)) {
      adjacentUnitsLocation.push(rightEnemyLocation);
    }

    return adjacentUnitsLocation;
  }

  private getRowEnemiesLocation(rowIndex: number): (boardLocation | null)[] {
    return this.board
      .getBoardMatrix()
      [rowIndex].filter((u) => u)
      .map((u) => {
        const unitBoardLocation = this.getUnitBoardLocation(u as Unit);
        if (unitBoardLocation) {
          return unitBoardLocation;
        }
        return null;
      });
  }

  getTeamOfNextLine(unitBoardLocation: boardLocation): Team | null {
    const team = this.getTeamOfUnit(unitBoardLocation);
    const valueChange: number = team === Team.topTeam ? 1 : -1;

    if (this.getRowEnemiesLocation(unitBoardLocation.rowIndex + valueChange).length === 0) {
      return null;
    }

    return this.getTeamOfUnit({
      rowIndex: unitBoardLocation.rowIndex + valueChange,
      columnIndex: unitBoardLocation.columnIndex,
    });
  }

  getNearestLineEnemiesLocation(unitBoardLocation: boardLocation): boardLocation[] | null {
    const matrix = this.board.getBoardMatrix();
    const teamOfUnit: Team = this.getTeamOfUnit(unitBoardLocation);
    const rowsHalfIndex = Math.floor(matrix.length / 2);

    if (teamOfUnit === Team.bottomTeam) {
      for (let i = rowsHalfIndex - 1; i >= 0; i -= 1) {
        if (matrix[i].length) {
          return this.getRowEnemiesLocation(i).filter(this.removeDeadUnits);
        }
      }
    } else {
      for (let i = rowsHalfIndex; i < matrix.length; i += 1) {
        if (matrix[i].filter((u) => u).length) {
          return this.getRowEnemiesLocation(i).filter(this.removeDeadUnits);
        }
      }
    }

    return null;
  }

  private switchTeam(team: Team) {
    return team === Team.bottomTeam ? Team.topTeam : Team.bottomTeam;
  }

  private getAllTeamUnits(unitBoardLocation: boardLocation, allies = false): boardLocation[] {
    const matrix = this.board.getBoardMatrix();
    const teamOfUnit: Team = this.getTeamOfUnit(unitBoardLocation);
    const consideringTeam = allies ? this.switchTeam(teamOfUnit) : teamOfUnit;
    const rowsHalfIndex = Math.floor(matrix.length / 2);
    const enemiesUnitsLocation = [];

    if (consideringTeam === Team.bottomTeam) {
      for (let i = rowsHalfIndex - 1; i >= 0; i -= 1) {
        for (let j = 0; j < matrix[i].length; j += 1) {
          if (matrix[i][j]) {
            const enemyBoardLocation = this.getUnitBoardLocation(matrix[i][j] as Unit);
            if (enemyBoardLocation) {
              enemiesUnitsLocation.push(enemyBoardLocation);
            }
          }
        }
      }
    } else {
      for (let i = rowsHalfIndex; i < matrix.length; i += 1) {
        for (let j = 0; j < matrix[i].length; j += 1) {
          if (matrix[i][j]) {
            const enemyBoardLocation = this.getUnitBoardLocation(matrix[i][j] as Unit);
            if (enemyBoardLocation) {
              enemiesUnitsLocation.push(enemyBoardLocation);
            }
          }
        }
      }
    }

    return enemiesUnitsLocation;
  }

  getAllEnemiesLocation(unitBoardLocation: boardLocation): boardLocation[] {
    return this.getAllTeamUnits(unitBoardLocation);
  }

  getAllAlliesLocation(unitBoardLocation: boardLocation): boardLocation[] {
    return this.getAllTeamUnits(unitBoardLocation, true);
  }
}
