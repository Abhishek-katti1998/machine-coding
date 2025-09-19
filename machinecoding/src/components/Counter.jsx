import { useState, useRef, useEffect } from "react";

function Counter({ initialValue = 0, step = 1, onChange, value }) {
  if (step <= 0) throw new Error("Invalid Step");

  const isControlled = value !== undefined;
  const [internalCount, setInternalCount] = useState(initialValue);
  const wasControlled = useRef(isControlled);

  // Warn if switching controlled/uncontrolled
  useEffect(() => {
    if (wasControlled.current !== isControlled) {
      console.warn(
        `Counter changed from ${
          wasControlled.current ? "controlled" : "uncontrolled"
        } to ${isControlled ? "controlled" : "uncontrolled"}.`
      );
      wasControlled.current = isControlled;
    }
  }, [isControlled]);

  const displayedCount = isControlled ? value : internalCount;

  const updateValue = (newVal) => {
    if (!isControlled) {
      setInternalCount(newVal);
    }
    onChange?.(newVal);
  };

  const incrementHandler = () => updateValue(displayedCount + step);
  const decrementHandler = () => updateValue(displayedCount - step);
  const resetHandler = () => updateValue(initialValue);

  // Optional: warn if controlled but no onChange
  useEffect(() => {
    if (isControlled && !onChange) {
      console.warn(
        "Counter is controlled but 'onChange' was not provided. Buttons will not work."
      );
    }
  }, [isControlled, onChange]);

  return (
    <div role="group" aria-label="Counter controls">
      <button onClick={incrementHandler}>Increment</button>
      <button onClick={decrementHandler}>Decrement</button>
      <button onClick={resetHandler}>Reset</button>
      <p aria-live="polite" role="status">{displayedCount}</p>
    </div>
  );
}

export default Counter;
