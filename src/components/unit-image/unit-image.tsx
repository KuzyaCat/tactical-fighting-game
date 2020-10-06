import React, { ReactElement } from 'react';
import { UnitImages } from './images';

interface IUnitImageProps {
  name: string;
  isDead?: boolean;
}

export const UnitImage = ({ name, isDead }: IUnitImageProps): ReactElement => {
  const formattedUnitName: string = name.split(' ').join('');
  const UnitImageComponent: React.FC = UnitImages[`${formattedUnitName}Image`];

  return <UnitImageComponent />;
};
