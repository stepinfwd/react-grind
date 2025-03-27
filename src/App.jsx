import React, { useEffect, useState, useRef } from 'react';

function App() {
  const defaultUser = { name: 'kiran', age: 26 };
  const [user, setUser] = useState({});
  const renderCount = useRef(0);

  renderCount.current += 1; // Increment on every render

  useEffect(() => {
    setUser(defaultUser);
  }, [defaultUser]);

  return (
    <>
      <div>{user.name}</div>
      <p>{renderCount.current}</p>
    </>
  );
}

export default App;
