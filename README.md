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


## The Solution: Use useRef to Skip Initial Execution
We can use a useRef flag to block the first effect execution while still running it on dependency changes.