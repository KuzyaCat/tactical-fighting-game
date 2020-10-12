import React, { ReactElement } from 'react';

import { UNIT_IMAGES_PATH } from '../../../helpers/constants';
import './index.css';

export const CentaurImage = (): ReactElement => (
  <img alt="centaur" src={`${UNIT_IMAGES_PATH}/centaur.jpg`} className="unit-image" />
);
