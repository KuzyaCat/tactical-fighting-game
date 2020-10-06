import React, { ReactElement } from 'react';

import { UNIT_IMAGES_PATH } from '../../../helpers/constants';
import './index.css';

export const BishopImage = (): ReactElement => (
  <img alt="bishop" src={`${UNIT_IMAGES_PATH}/bishop.jpg`} className="unit-image" />
);
