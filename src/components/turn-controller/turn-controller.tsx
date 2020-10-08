import React, { Dispatch, ReactElement, SetStateAction } from 'react';

import './turn-controller.css';

interface ITurnControllerProps {
  toSelectTarget: boolean;
  setToSelectTarget: Dispatch<SetStateAction<boolean>>;
}

export const TurnController = ({ toSelectTarget, setToSelectTarget }: ITurnControllerProps): ReactElement => {
  return (
    <div className="turn-controller">
      <button onClick={() => setToSelectTarget(!toSelectTarget)}>Deal</button>
      <button>Defense</button>
    </div>
  );
};
