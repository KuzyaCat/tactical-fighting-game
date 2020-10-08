import React, { Dispatch, ReactElement, SetStateAction } from 'react';

import './turn-controller.css';

interface ITurnControllerProps {
  toSelectTarget: boolean;
  setToSelectTarget: Dispatch<SetStateAction<boolean>>;
  handleDefense: () => void;
}

export const TurnController = ({
  toSelectTarget,
  setToSelectTarget,
  handleDefense,
}: ITurnControllerProps): ReactElement => {
  return (
    <div className="turn-controller">
      <button onClick={() => setToSelectTarget(!toSelectTarget)}>Deal</button>
      <button onClick={() => handleDefense()}>Defense</button>
    </div>
  );
};
