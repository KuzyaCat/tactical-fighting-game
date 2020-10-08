import React, { ReactElement, useEffect, useState } from 'react';

import { unit, action, turnGenerator } from '../../types';
import { Unit } from '../../entities/units';
import { UnitItem } from '../unit-item';
import './board.css';

interface IBoardProps {
  initialUnits: unit[][];
  units: unit[][];
  toSelectTarget: boolean;
  handleSelectTarget: (unit: Unit) => void;
  turnGenerator: turnGenerator;
  currentUnit: Unit;
  action: action;
}

export const Board = ({
  initialUnits,
  units,
  currentUnit,
  toSelectTarget,
  action,
  handleSelectTarget,
}: IBoardProps): ReactElement => {
  const [possibleTargets, setPossibleTargets] = useState<unit[]>();

  useEffect(() => {
    if (currentUnit) {
      setPossibleTargets(action.getPossibleTargetsOfUnit(currentUnit));
    }
  }, [currentUnit]);

  return (
    <div className="board-container">
      {initialUnits.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((unit, columnIndex) => {
            return (
              <UnitItem
                key={columnIndex}
                unit={unit as Unit}
                isDead={Boolean(!units[rowIndex][columnIndex])}
                isCurrent={unit === currentUnit}
                isTarget={
                  toSelectTarget && possibleTargets?.findIndex((u) => u === units[rowIndex][columnIndex]) !== -1
                }
                handleSelectTarget={handleSelectTarget}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
