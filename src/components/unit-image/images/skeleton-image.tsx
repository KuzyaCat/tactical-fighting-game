import React, { ReactElement } from 'react';

import { UNIT_IMAGES_PATH } from '../../../helpers/constants';
import './index.css';

export const SkeletonImage = (): ReactElement => (
  <img alt="skeleton" src={`${UNIT_IMAGES_PATH}/skeleton.jpg`} className="unit-image" />
);
