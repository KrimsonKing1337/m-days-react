import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { Bg } from 'components/Bg';

export const Main = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== '/standalone') {
      window.history.replaceState({}, '', '/');
    }
  }, [pathname]);

  return (
    <>
      <Bg />
    </>
  );
};
