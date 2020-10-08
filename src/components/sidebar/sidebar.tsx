import React, { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react';

import { turnGenerator } from '../../types';
import { Unit } from '../../entities/units';
import { Order } from '../order';
import { TurnController } from '../turn-controller';
import './sidebar.css';

interface ISidebarProps {
  turnGenerator: turnGenerator;
  toSelectTarget: boolean;
  setToSelectTarget: Dispatch<SetStateAction<boolean>>;
  currentUnit: Unit;
}

export const Sidebar = ({
  toSelectTarget,
  setToSelectTarget,
  currentUnit,
  turnGenerator,
}: ISidebarProps): ReactElement | null => {
  if (!currentUnit) {
    return null;
  }

  return (
    <div className="sidebar">
      <Order currentUnit={(currentUnit as unknown) as Unit} unitSequence={turnGenerator.getUnitSequence()} />
      <TurnController toSelectTarget={toSelectTarget} setToSelectTarget={setToSelectTarget} />
    </div>
  );
};
