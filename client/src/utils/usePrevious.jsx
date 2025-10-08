import { useEffect, useRef } from "react";

function usePrevious(value) {
  const ref = useRef();

  // Only runs after render is done
  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Returns before render is done so ref's value hasn't been updated yet
  return ref.current;
}

export default usePrevious;
