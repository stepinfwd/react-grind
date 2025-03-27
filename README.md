# Understanding `useEffect` Cleanup When Dependencies Change

## Introduction

React's `useEffect` hook allows us to perform side effects in function components, such as fetching data, setting up event listeners, or manipulating the DOM.

A key concept in `useEffect` is **cleanup functions**, which help prevent memory leaks and ensure proper resource management.

This article focuses on how `useEffect` behaves when **dependencies change** and why the **cleanup function** is essential.

---

## The Code in Question

```jsx
useEffect(() => {
  console.log('mounted', count);

  return () => {
    console.log('unmounted', count);
  };
}, [count]);
```

### How This Works

The effect runs whenever `count` changes because `[count]` is in the dependency array.

Before the effect runs again, the previous effect is cleaned up by executing the function inside `return () => { ... }`.

### Step-by-Step Execution

#### 1. Initial Render (count = 0)
When the component first mounts:

```
mounted 0
```

- The effect runs for the first time.
- The cleanup function does not run yet because there was no previous effect.

#### 2. If count Changes to 1
Now, `count` updates to 1, so React re-runs the effect:

```
unmounted 0
mounted 1
```

- First, React cleans up the previous effect (`unmounted 0`).
- Then, the new effect runs (`mounted 1`).

This ensures that we don't leave behind any side effects from the old value of `count`.

#### 3. If count Changes to 2

```
unmounted 1
mounted 2
```

- Again, the previous effect is cleaned up (`unmounted 1`).
- Then, the effect runs again with the new `count` value (`mounted 2`).

### When Does unmounted Run?

- Before every re-run of the effect (due to `count` changing).
- When the component unmounts (i.e., it is removed from the DOM).

### Key Takeaways

✅ Each time `count` changes, the old effect is cleaned up before running the new one.
✅ This cleanup prevents memory leaks and ensures only the latest effect is active.
✅ This does not mean the component itself is unmounting; it's just resetting the effect for a new `count` value.