import { useState, useEffect } from 'react';

interface Size {
  width: number | undefined;
  height: number | undefined;
}

export const useWindowSize = (): Size => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Adding event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated initial window size
    handleResize();

    // Remove listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // empty array ensures effect is only run on mount

  return windowSize;
};
