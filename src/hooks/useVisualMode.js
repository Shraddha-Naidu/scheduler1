import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode) {
    setHistory((prev) => ([newMode, ...prev]));
    setMode(newMode);
  }

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length -1])
    }
  }

  return { mode, transition, back };
};

