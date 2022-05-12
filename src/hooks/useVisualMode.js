import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Transitions to new mode
  function transition(newMode, replace) {
    if (replace) {
      history.pop();
      setHistory([...history, newMode])
    } else {
      setHistory([...history, newMode])
    }
    setMode(newMode);
  }

 //Back to previous mode
  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length -1])
    }
  }

  return { mode, transition, back };
};

