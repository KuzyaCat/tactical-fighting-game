import React, { Dispatch, ReactElement, SetStateAction } from 'react';

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
  handleDefense: () => void;
}

export const Sidebar = ({
  toSelectTarget,
  setToSelectTarget,
  currentUnit,
  turnGenerator,
  handleDefense,
}: ISidebarProps): ReactElement | null => {
  if (!currentUnit) {
    return null;
  }

  return (
    <div className="sidebar">
      <Order
        currentUnit={(currentUnit as unknown) as Unit}
        unitSequence={turnGenerator.getUnitSequence().filter((u) => u)}
      />
      <TurnController
        toSelectTarget={toSelectTarget}
        setToSelectTarget={setToSelectTarget}
        handleDefense={handleDefense}
      />
    </div>
  );
};
