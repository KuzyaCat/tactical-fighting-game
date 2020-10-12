import React, { ReactElement } from 'react';

import { IDealerType } from '../../entities/units/types/deal-type/IDealerType';
import { UnitHp } from './components/unit-hp';
import { UnitDealValue } from './components/unit-deal-value';
import './unit-info.css';

interface IUnitInfoProps {
  hp: number;
  name: string;
  dealValue: number;
  dealerType: IDealerType;
}

export const UnitInfo = ({ hp, name, dealValue, dealerType }: IUnitInfoProps): ReactElement => {
  return (
    <div className="user-info">
      <UnitDealValue dealValue={dealValue} dealerType={dealerType} />
      <span>{name}</span>
      <UnitHp hp={hp} />
    </div>
  );
};
