import React, { useState } from 'react';
import { Button } from './components/ui/button';
import ScoreCard from './ScoreCard';

const App = () => {
  const [isPlayer1, setIsPlayer1] = useState(true);
  return (
    <div>
      {isPlayer1 ? (
        <ScoreCard player={'player1'} />
      ) : (
        <ScoreCard player={'player2'} />
      )}

      <Button onClick={() => setIsPlayer1(false)}>Change player</Button>
    </div>
  );
};

export default App;
