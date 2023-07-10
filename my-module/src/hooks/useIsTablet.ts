import { useEffect, useState } from 'react';

const getIsTablet = () => (typeof window === 'undefined' ? false : window.innerWidth < 1024);

export default function useIsTablet() {
  const [isTablet, setIsTablet] = useState(getIsTablet());

  useEffect(() => {
    const onResize = () => {
      setIsTablet(getIsTablet());
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return isTablet;
}
