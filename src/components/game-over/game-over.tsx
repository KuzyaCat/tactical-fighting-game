import React, { ReactElement } from 'react';

import { Team } from '../../types';
import './game-over.css';

interface IGameOverProps {
  currentTeam: Team;
  handleNewGame: () => void;
}

export const GameOver = ({ currentTeam, handleNewGame }: IGameOverProps): ReactElement => {
  return (
    <div className="game-over-container">
      <span>Game Over</span>
      <span>
        The winner is <span className="team-name">{currentTeam === Team.bottomTeam ? 'Bottom team' : 'Top team'}</span>
      </span>
      <button onClick={() => handleNewGame()}>New game</button>
    </div>
  );
};
