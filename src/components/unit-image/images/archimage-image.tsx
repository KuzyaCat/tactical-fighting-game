import React, { ReactElement } from 'react';

import { UNIT_IMAGES_PATH } from '../../../helpers/constants';
import './index.css';

export const ArchimageImage = (): ReactElement => (
  <img alt="archimage" src={`${UNIT_IMAGES_PATH}/archimage.jpg`} className="unit-image" />
);
