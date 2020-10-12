import React, { ReactElement } from 'react';

import { UNIT_IMAGES_PATH } from '../../../helpers/constants';
import './index.css';

export const BanditImage = (): ReactElement => (
  <img alt="bandit" src={`${UNIT_IMAGES_PATH}/bandit.jpg`} className="unit-image" />
);
