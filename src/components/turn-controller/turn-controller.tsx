import React, { Dispatch, ReactElement, SetStateAction } from 'react';

import './turn-controller.css';

interface ITurnControllerProps {
  toNextTurn: boolean;
  setToNextTurn: Dispatch<SetStateAction<boolean>>;
}

export const TurnController = ({ toNextTurn, setToNextTurn }: ITurnControllerProps): ReactElement => {
  return (
    <div className="turn-controller">
      <button>Deal</button>
      <button>Defense</button>
    </div>
  );
};
