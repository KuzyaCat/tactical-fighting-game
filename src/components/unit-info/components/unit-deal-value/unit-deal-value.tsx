import React, { ReactElement } from 'react';

import { ICONS_PATH } from '../../../../helpers/constants';
import { IDealerType } from '../../../../entities/units/types/deal-type/IDealerType';
import { Damager } from '../../../../entities/units/types/deal-type/Damager';
import { Healer } from '../../../../entities/units/types/deal-type/Healer';
import { Paralyzer } from '../../../../entities/units/types/deal-type/Paralyzer';
import './unit-deal-value.css';

interface IUnitDealValueProps {
  dealValue: number;
  dealerType: IDealerType;
}

const mapDealerTypeToFilename = (dealerType: IDealerType): string => {
  if (dealerType instanceof Damager) {
    return 'damage';
  } else if (dealerType instanceof Healer) {
    return 'heal';
  } else if (dealerType instanceof Paralyzer) {
    return 'paralyze';
  }
  return 'damage';
};

export const UnitDealValue = ({ dealValue, dealerType }: IUnitDealValueProps): ReactElement => {
  return (
    <div className="unit-deal-value-container">
      <img alt="value" src={`${ICONS_PATH}/${mapDealerTypeToFilename(dealerType)}.png`} />
      <span>{dealValue}</span>
    </div>
  );
};
