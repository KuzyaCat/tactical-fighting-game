import React, { ReactElement } from 'react';

import { UNIT_IMAGES_PATH } from '../../../helpers/constants';
import './index.css';

export const SkeletonMageImage = (): ReactElement => (
  <img alt="skeleton-mage" src={`${UNIT_IMAGES_PATH}/skeleton-mage.jpg`} className="unit-image" />
);
