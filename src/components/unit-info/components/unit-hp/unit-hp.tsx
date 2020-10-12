import React, { ReactElement } from 'react';
import { ICONS_PATH } from '../../../../helpers/constants';

import './unit-hp.css';

interface IUnitHpProps {
  hp: number;
}

export const UnitHp = ({ hp }: IUnitHpProps): ReactElement => {
  return (
    <div className="unit-hp-container">
      <img alt="hp" src={`${ICONS_PATH}/hp.png`} />
      <span>{hp}</span>
    </div>
  );
};
