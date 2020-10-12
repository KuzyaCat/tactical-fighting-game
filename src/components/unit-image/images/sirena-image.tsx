import React, { ReactElement } from 'react';

import { UNIT_IMAGES_PATH } from '../../../helpers/constants';
import './index.css';

export const SirenaImage = (): ReactElement => (
  <img alt="sirena" src={`${UNIT_IMAGES_PATH}/sirena.jpg`} className="unit-image" />
);
