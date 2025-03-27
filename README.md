# React Dependency Arrays: Avoiding Infinite Re-renders

## Introduction
Understanding how dependency arrays work in React hooks (`useEffect`, `useMemo`, `useCallback`) is crucial for preventing performance issues and infinite re-render loops. This document explains the behavior with different value types and provides best practices.

## Core Concept
React uses **referential equality (`Object.is`)** to compare dependencies between renders. This means:

- **Primitives** (strings, numbers, booleans): Compared by value
- **Non-primitives** (objects, arrays, functions): Compared by memory reference

## Behavior by Data Type

### ✅ Safe: Primitives
```javascript
// Strings, numbers, booleans are safe
useEffect(() => {
  console.log("Safe!");
}, ["constant string", 42, true]);
```
#### Characteristics:
- Same value → same dependency
- No re-render triggered if value doesn't change
- Example: `"react" === "react"` → `true`

### ⚠️ Dangerous: Non-primitives
```javascript
// Objects, arrays, functions are dangerous
useEffect(() => {
  console.log("Danger!");
}, [{ key: "value" }, [1, 2, 3], () => {}]);
```
#### Characteristics:
- New reference created on every render
- `{}` === `{}` → `false`
- `[] === []` → `false`
- `(() => {}) === (() => {})` → `false`

## Common Pitfalls

### 1. Object Literals in Dependencies
```javascript
// 🚨 Infinite loop!
useEffect(() => {
  setState({ ...state, updated: true });
}, [{ ...state }]); // New object every render
```

### 2. Inline Functions in Dependencies
```javascript
// 🚨 Infinite loop!
useEffect(() => {
  fetchData();
}, [fetchData]); // If fetchData isn't memoized
```

### 3. Array Literals in Dependencies
```javascript
// 🚨 Infinite loop!
useEffect(() => {
  processItems([...items]);
}, [[...items]]); // New array every render
```

## Solutions

### For Objects/Arrays
```javascript
// ✅ Solution 1: Move outside component
const config = { apiUrl: "/data" };

function Component() {
  useEffect(() => {
    fetch(config.apiUrl);
  }, []); // Safe because config is stable
}
```

```javascript
// ✅ Solution 2: useMemo
function Component() {
  const config = useMemo(() => ({ apiUrl: "/data" }), []);
  useEffect(() => {
    fetch(config.apiUrl);
  }, [config]); // Safe because memoized
}
```

```javascript
// ✅ Solution 3: Use primitives
function Component({ user }) {
  useEffect(() => {
    updateProfile(user.id);
  }, [user.id]); // Safe because id is primitive
}
```

### For Functions
```javascript
// ✅ Solution: useCallback
function Component() {
  const fetchData = useCallback(() => {
    // fetch logic
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Safe because memoized
}
```

## Best Practices
- **Minimize dependencies** - Only include what's truly needed
- **Prefer primitives** in dependency arrays when possible
- **Memoize expensive computations** with `useMemo`
- **Stabilize functions** with `useCallback`
- **Lift constants up** - Move objects/arrays outside components when possible

## Debugging Tips
- Use the **React DevTools Profiler** to identify unnecessary re-renders
- Add **console logs** to dependency arrays:

```javascript
useEffect(() => {
  console.log("Effect ran");
}, [dep]); // Add console.log(dep) above
```
- Consider **ESLint plugins** like `eslint-plugin-react-hooks`