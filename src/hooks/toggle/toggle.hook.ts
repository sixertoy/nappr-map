import { useCallback, useState } from 'react';

export const useToggle = (initialState: boolean): [boolean, () => void] => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return [state, toggle];
};
