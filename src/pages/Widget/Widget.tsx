import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';

import { Themes } from '@enums';

import { actions } from 'store/main/slice';

import { Bg } from 'components/Bg';

export const Widget = () => {
  const dispatch = useDispatch();

  const { pathname, search } = useLocation();

  useEffect(() => {
    if (pathname !== '/standalone') {
      window.history.replaceState({}, '', `/${search}`);
    }

    const searchParams = new URLSearchParams(search);
    const theme = searchParams.get('theme') as Themes;

    if (theme) {
      dispatch(actions.setTheme(theme));
    }

  }, [pathname, search]);

  return (
    <>
      <Bg />
    </>
  );
};
