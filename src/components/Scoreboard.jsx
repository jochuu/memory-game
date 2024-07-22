import { useEffect, useState } from 'react';

function Scoreboard({ chosen }) {
  // current score is the length of the 'chosen' pokemon array
  const currentScore = chosen.length;
  const [bestScore, setBestScore] = useState(0);

  // update bestScore to be currentScore if currentScore is greater
  useEffect(() => {
    if (currentScore > bestScore) {
      setBestScore(currentScore);
    }
  }, [currentScore, bestScore]);

  return (
    <>
      <div className='score-board'>
        <div className='score-board-header'>Score</div>
        <div className='score-board-body'>
          <div className='current-score'>{currentScore}</div>
          <div className='best-score'>{bestScore}</div>
        </div>
      </div>
    </>
  );
}

export default Scoreboard;
