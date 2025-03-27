import React, { useState } from 'react';

const App = () => {
  const [users, setUsers] = useState(
    Array.from({ length: 10 }, (_, i) => ({ id: i, name: `User ${i}` }))
  );

  const handleRemove=(id)=>{
    setUsers(users.filter((user)=>user.id!==id))
  }


  return (
    <div className='flex flex-col'>
      {users.map((item,index) => (
        <button key={index} onClick={()=>{handleRemove(item.id)}}>
          {item.name} 
        </button>
      ))}
    </div>
  );
};

export default App;
