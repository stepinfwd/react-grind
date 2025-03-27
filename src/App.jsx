// import React, { useRef, useState } from 'react';

// const App = () => {
//   const [password, setPassword] = useState();
//   const [name, setName] = useState();

//   const handleSubmit = () => {
//     console.log('try----', { name, password });
//   };

//   let renderRef = useRef(0);

//   console.log('renderCount', renderRef.current++);

//   return (
//     <div className="w-5xl">
//       <form className="flex flex-col" onSubmit={handleSubmit}>
//         <label>name</label>
//         <input
//           type="text"
//           name="name"
//           onChange={(e) => setName(e.target.value)}
//         ></input>
//         <label>password</label>
//         <input
//           type="password"
//           name="password"
//           onChange={(e) => setPassword(e.target.value)}
//         ></input>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default App;

import React, { useRef, useState } from 'react';

const App = () => {
  // const [password, setPassword] = useState();
  // const [name, setName] = useState();

  let passwordRef = useRef();
  let nameRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('try----', {
      name: nameRef.current.value,
      password: passwordRef.current.value,
    });
  };

  let renderRef = useRef(0);

  console.log('renderCount', renderRef.current++);

  return (
    <div className="w-5xl">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label>name</label>
        <input
          type="text"
          name="name"
          ref={nameRef}
          // onChange={(e) => setName(e.target.value)}
        ></input>
        <label>password</label>
        <input
          type="password"
          name="password"
          ref={passwordRef}

          // onChange={(e) => setPassword(e.target.value)}
        ></input>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
