import React, { ReactElement } from 'react';

import { Team } from '../../types';
import './game-over.css';

interface IGameOverProps {
  currentTeam: Team;
}

export const GameOver = ({ currentTeam }: IGameOverProps): ReactElement => {
  return (
    <div className="game-over-container">
      <span>Game Over</span>
      <span>
        The winner is <span className="team-name">{currentTeam === Team.bottomTeam ? 'Bottom team' : 'Top team'}</span>
      </span>
    </div>
  );
};
