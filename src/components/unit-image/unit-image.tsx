import React, { ReactElement } from 'react';
import { UnitImages } from './images';
import { ICONS_PATH } from '../../helpers/constants';
import './unit-image.css';

interface IUnitImageProps {
  name: string;
  isDead?: boolean;
  isDefending?: boolean;
}

export const UnitImage = ({ name, isDead, isDefending }: IUnitImageProps): ReactElement => {
  const formattedUnitName: string = name.split(' ').join('');
  const UnitImageComponent: React.FC = UnitImages[`${formattedUnitName}Image`];

  return (
    <div className="unit-image-container">
      <UnitImageComponent />
      {isDefending && !isDead && <img alt="defending" src={`${ICONS_PATH}/shield.svg`} className="status" />}
      {isDead && <img alt="dead" src={`${ICONS_PATH}/skull.svg`} className="status" />}
    </div>
  );
};
