import React, { ReactElement } from 'react';

import { UNIT_IMAGES_PATH } from '../../../helpers/constants';
import './index.css';

export const MonkImage = (): ReactElement => (
  <img alt="monk" src={`${UNIT_IMAGES_PATH}/monk.jpg`} className="unit-image" />
);
