import React, { ReactElement, useEffect, useState } from 'react';

import { Unit } from '../../entities/units';
import { UnitImage } from '../unit-image';
import './order.css';

interface IOrderProps {
  currentUnit: Unit;
  unitSequence: Unit[];
}

const UNIT_COUNT_TO_DISPLAY = 6;

export const Order = ({ currentUnit, unitSequence }: IOrderProps): ReactElement => {
  const [currentSequence, setCurrentSequence] = useState<Unit[]>(unitSequence);

  useEffect(() => {
    const currentUnitIndexInSequence = unitSequence.findIndex((u) => u === currentUnit);
    if (currentUnitIndexInSequence !== -1) {
      setCurrentSequence([
        unitSequence[currentUnitIndexInSequence],
        ...[
          ...unitSequence.slice(currentUnitIndexInSequence),
          ...unitSequence.slice(0, currentUnitIndexInSequence),
        ].slice(0, UNIT_COUNT_TO_DISPLAY + 1),
      ]);
    }
  }, [currentUnit]);

  return (
    <div className="order">
      {currentSequence.map((u, index) => (
        <div className="order-item" key={index}>
          <UnitImage name={u.getName()} />
        </div>
      ))}
    </div>
  );
};
