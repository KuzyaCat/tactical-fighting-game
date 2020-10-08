import React, { ReactElement } from 'react';
import cn from 'classnames';

import { Unit } from '../../entities/units';
import { UnitImage } from '../unit-image';
import { UnitInfo } from '../unit-info';
import './unit-item.css';

interface IUnitItemProps {
  unit: Unit;
  isDead: boolean;
  isCurrent: boolean;
  isTarget: boolean;
  handleSelectTarget: (arg0: Unit) => void;
}

export const UnitItem = ({ unit, isDead, isCurrent, isTarget, handleSelectTarget }: IUnitItemProps): ReactElement => {
  return (
    <div
      className={cn({
        'unit-item': true,
        current: isCurrent,
        target: isTarget,
      })}
      onClick={() => handleSelectTarget(unit)}
    >
      <UnitImage name={unit.getName()} isDead={isDead} />
      <UnitInfo
        name={unit.getName()}
        hp={unit.getHp()}
        dealValue={unit.getDealValue()}
        dealerType={unit.getDealerType()}
      />
    </div>
  );
};
