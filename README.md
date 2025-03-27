# 🚀 Preventing Initial `useEffect` Execution in React

## 📌 Introduction  
In React, `useEffect` runs after every render by default. Sometimes, you may want to **prevent it from executing on the first render** while still running on subsequent updates.  

This guide explains how to achieve this using `useRef`.  

---

## ❌ The Problem: Unwanted API Calls on Initial Render  
By default, `useEffect` runs after the first render and on every dependency update:

```javascript
useEffect(() => {
  fetchUserData(); // Runs immediately on mount
}, [userId]); // Runs again whenever userId changes
```
🔴 **Issue:** If `fetchUserData()` is an expensive API call, we might want to skip it on the first render.  

---

## ✅ The Solution: Use `useRef` to Skip Initial Execution  
We can use a `useRef` flag to **block the first effect execution** while still running it on dependency changes.

### Example: Prevent API Call on Mount  
```javascript
import React, { useEffect, useState, useRef, useCallback } from "react";

const UserProfile = () => {
  const isMounted = useRef(false); // Track if component has mounted
  const [userId, setUserId] = useState(1);
  const [userData, setUserData] = useState(null);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [userId]); // Recreates only when userId changes

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return; // Prevents first execution
    }

    fetchUserData();
  }, [fetchUserData]); // Runs only when fetchUserData changes

  return (
    <div>
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={() => setUserId((prev) => prev + 1)}>Next User</button>
    </div>
  );
};

export default UserProfile;
```

---

## 🔍 How Does `useRef` Prevent the First Execution?  
1. **First Render:**  
   - `isMounted.current` is `false`.  
   - The `if` condition runs → `isMounted.current = true`.  
   - `return;` **stops execution** before calling `fetchUserData()`.  

2. **Subsequent Renders:**  
   - `isMounted.current` is now `true`.  
   - The `if` condition is skipped, and `fetchUserData()` runs **when `userId` changes**.  

---

## 🛠 Alternative Approaches  

### 1️⃣ **Run on Mount but Skip Re-renders**  
If you want `useEffect` to **run on mount** but not on updates, use an **empty dependency array**:
```javascript
useEffect(() => {
  fetchUserData();
}, []); // Runs only on mount, never again
```

### 2️⃣ **Use a Conditional Check in Effect**  
Instead of `useRef`, you can check if the `userId` has changed:
```javascript
useEffect(() => {
  if (userId !== 1) fetchUserData(); // Skips first render but runs when userId changes
}, [userId]);
```

---

## 🎯 Conclusion  
Using `useRef` is a simple and effective way to **skip the initial execution** of `useEffect` while allowing it to run on updates.  

🚀 **Key Takeaways:**  
✔ `useRef` stores a persistent flag across renders.  
✔ Prevents unwanted API calls or effects on the first render.  
✔ Ensures `useEffect` still runs on state changes.  

Happy coding! 🎉  