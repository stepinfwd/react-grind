import React, { useState, useRef, useEffect, useMemo } from 'react';

const App = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [darkmode, setDarkmode] = useState(false);

  const render = useRef(0);

  // const person = { personAge: age, personName: name };

  const person = useMemo(() => {
    return { personAge: age, personName: name };
  }, [name, age]);

  useEffect(() => {
    console.log('person rerender', person);
  }, [person]);

  console.log('render conut', render.current++);

  return (
    <div>
      <form className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label htmlFor="darkmode">Dark Mode</label>
        <input
          id="darkmode"
          type="checkbox"
          checked={darkmode}
          onChange={() => setDarkmode(!darkmode)}
        />
      </form>
    </div>
  );
};

export default App;
