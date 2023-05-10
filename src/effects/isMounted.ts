import { useRef, useEffect } from 'react';

/**
 * Отслеживание первого рендера комопнента
 * @return boolean
 */
export const useComponentDidMount = () => {
  const isMount = useRef(false);
  useEffect(() => {
    isMount.current = true;
  }, []);
  return isMount.current;
};
