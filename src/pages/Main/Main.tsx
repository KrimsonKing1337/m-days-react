import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { Bg } from 'components/Bg';

export const Main = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (pathname !== '/standalone') {
      window.history.replaceState({}, '', `/${search}`);
    }
  }, [pathname]);

  return (
    <>
      <Bg />
    </>
  );
};
