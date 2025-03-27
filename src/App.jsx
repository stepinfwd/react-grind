import React, { useEffect, useState, useRef, useCallback } from 'react';

const UserProfile = () => {
  const isMounted = useRef(false);
  const [userId, setUserId] = useState(1);
  const [userData, setUserData] = useState(null);

  const fetchUserData = useCallback(async () => {
    console.log('fetchUserData-----');
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [userId]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return; // Avoid effect on first mount
    }

    fetchUserData();
  }, [fetchUserData]);

  return (
    <div>
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Phone:</strong> {userData.phone}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={() => setUserId((prev) => prev + 1)}>Next User</button>
    </div>
  );
};

export default UserProfile;
