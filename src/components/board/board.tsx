import React, { ReactElement } from 'react';

import { unit } from '../../types';
import { Unit } from '../../entities/units';
import { UnitItem } from '../unit-item';
import './board.css';

interface IBoardProps {
  initialUnits: unit[][];
  units: unit[][];
}

export const Board = ({ initialUnits, units }: IBoardProps): ReactElement => (
  <div className="board-container">
    {initialUnits.map((row, rowIndex) => (
      <div key={rowIndex} className="board-row">
        {row.map((unit, columnIndex) => (
          <UnitItem key={columnIndex} unit={unit as Unit} isDead={Boolean(units[rowIndex][columnIndex])} />
        ))}
      </div>
    ))}
  </div>
);
