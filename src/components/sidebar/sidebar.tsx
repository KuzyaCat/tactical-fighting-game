import React, { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react';

import { turnGenerator } from '../../types';
import { Unit } from '../../entities/units';
import { Order } from '../order';
import { TurnController } from '../turn-controller';
import './sidebar.css';

interface ISidebarProps {
  turnGenerator: turnGenerator;
  setToSelectTarget: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({ turnGenerator }: ISidebarProps): ReactElement | null => {
  const [currentUnit, setCurrentUnit] = useState<Unit>();
  const [toNextTurn, setToNextTurn] = useState<boolean>(false);

  useEffect(() => {
    setCurrentUnit(turnGenerator.next());
  }, []);

  if (!currentUnit) {
    return null;
  }

  return (
    <div className="sidebar">
      <Order currentUnit={(currentUnit as unknown) as Unit} unitSequence={turnGenerator.getUnitSequence()} />
      <TurnController toNextTurn={toNextTurn} setToNextTurn={setToNextTurn} />
    </div>
  );
};
