import React, { useState } from 'react';
import { Button } from './components/ui/button';

const ScoreCard = (props) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{props.player}</h1>
      <p>{count}</p>
      <div>
        <Button onClick={() => setCount(count + 1)}>+</Button>
        <Button onClick={() => setCount(count - 1)}>-</Button>
      </div>
    </div>
  );
};

export default ScoreCard;
