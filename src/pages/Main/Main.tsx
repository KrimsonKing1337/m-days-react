import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';

import { getBg } from 'api';

import { Themes } from '@types';

import { actions } from 'store/main/slice';

import { Bg } from 'components/Bg';

import { getPreset } from '../../@types/uniqIdPresets';

export const Main = () => {
  const dispatch = useDispatch();

  const { pathname, search } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const image = await getBg();
      const nextImage = await getBg();

      const imageBlob = URL.createObjectURL(image.data);
      const nextImageBlob = URL.createObjectURL(nextImage.data);

      dispatch(actions.setImage(imageBlob));
      dispatch(actions.setNextImage(nextImageBlob));
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (pathname !== '/standalone') {
      window.history.replaceState({}, '', `/${search}`);
    }

    const searchParams = new URLSearchParams(search);
    const theme = searchParams.get('theme') as Themes;
    const uniqId = searchParams.get('uniq-id') || '{}';

    if (theme) {
      dispatch(actions.setTheme(theme));
    }

    const presetValue = getPreset(uniqId);

    dispatch(actions.setPreset(presetValue));

  }, [pathname, search]);

  return (
    <>
      <Bg />
    </>
  );
};
