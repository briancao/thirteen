import { useState, useEffect } from 'react';

export default function useFullScreen() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const gameContainer = { height: 732, width: 412 };

  useEffect(() => {
    function handleResize() {
      var scale = Math.min(
        window.innerWidth / gameContainer.width,
        window.innerHeight / gameContainer.height,
      );

      if (scale >= 1) {
        var body = document.querySelector('body');
        body.style.transform = 'scale('.concat(scale, ')');
      }

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
