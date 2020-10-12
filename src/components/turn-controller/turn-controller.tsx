import React, { Dispatch, ReactElement, SetStateAction } from 'react';

import './turn-controller.css';

interface ITurnControllerProps {
  toSelectTarget: boolean;
  setToSelectTarget: Dispatch<SetStateAction<boolean>>;
  handleDefense: () => void;
  handleDeal: () => void;
}

export const TurnController = ({
  toSelectTarget,
  setToSelectTarget,
  handleDefense,
  handleDeal,
}: ITurnControllerProps): ReactElement => {
  return (
    <div className="turn-controller">
      <button onClick={() => handleDeal()}>Deal</button>
      <button onClick={() => handleDefense()}>Defense</button>
    </div>
  );
};
