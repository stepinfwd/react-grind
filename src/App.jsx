import React, { useEffect, useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('mounted', count);

    return () => {
      console.log('unmounted ', count);
    };
  }, []);

  useEffect(() => {
    console.log('mounted with dependency', count);

    return () => {
      console.log('unmounted with dependency ', count);
    };
  }, [count]);

  return (
    <div className="flex flex-col w-2xl">
      <div className="flex">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto"
          onClick={() => {
            setCount((count) => count + 1);
          }}
        >
          Increment
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setCount((count) => count - 1);
          }}
        >
          Decrement
        </button>
      </div>

      <p>{count}</p>
    </div>
  );
};

export default App;
