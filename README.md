# ScoreCard React App

## Overview
This is a simple React application that tracks player scores using the `ScoreCard` component. The app allows switching between Player 1 and Player 2. However, an issue arises where the score persists even after switching players. This README explains why that happens and how to fix it.

## Issue: Score Persists When Switching Players
By default, when switching players, the `ScoreCard` should reset the score (`count`). However, React's reconciliation process **reuses** the same component instance instead of unmounting and remounting it. This causes the score state to persist across player switches.

## Solution: Use Unique `key` Prop
To force React to treat `ScoreCard` as a **new** component when switching players, we use a unique `key` prop.

### **Before (Issue Present)**
```jsx
const App = () => {
  const [isPlayer1, setIsPlayer1] = useState(true);

  return (
    <div>
      {isPlayer1 ? (
        <ScoreCard player="player1" />
      ) : (
        <ScoreCard player="player2" />
      )}
      
      <Button onClick={() => setIsPlayer1(false)}>Change player</Button>
    </div>
  );
};
```
**Problem:** React reuses the `ScoreCard` component, so the score persists.

### **After (Fixed)**
```jsx
const App = () => {
  const [isPlayer1, setIsPlayer1] = useState(true);

  return (
    <div>
      {isPlayer1 ? (
        <ScoreCard key="player1" player="player1" />
      ) : (
        <ScoreCard key="player2" player="player2" />
      )}
      
      <Button onClick={() => setIsPlayer1(false)}>Change player</Button>
    </div>
  );
};
```

### **Why Does This Work?**
- The `key` prop tells React that `ScoreCard` should be treated as a **new instance** when switching players.
- This ensures that the component is **fully unmounted and remounted**, resetting the score to `0`.

## Run the Project
```sh
npm install
npm start
```

## Conclusion
Using a unique `key` prop is a simple way to ensure that component state resets when switching between different players. 🎉

