import React, { ReactElement } from 'react';

import { UNIT_IMAGES_PATH } from '../../../helpers/constants';
import './index.css';

export const ElfArcherImage = (): ReactElement => (
  <img alt="elf-archer" src={`${UNIT_IMAGES_PATH}/elf-archer.jpg`} className="unit-image" />
);
