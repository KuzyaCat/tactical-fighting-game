import React, { ReactElement } from 'react';

import { Unit } from '../../entities/units';
import { UnitImage } from '../unit-image';
import { UnitInfo } from '../unit-info';
import './unit-item.css';

interface IUnitItemProps {
  unit: Unit;
  isDead: boolean;
}

export const UnitItem = ({ unit, isDead }: IUnitItemProps): ReactElement => {
  return (
    <div className="unit-item">
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
