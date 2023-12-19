import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { Themes, TopicKeys } from '@enums';

import { actions } from 'store/main/slice';
import { selectors } from 'store/main/selectors';
import { TopicValue } from 'store/main/@types';

import { Bg } from 'components/Bg';

export const Widget = () => {
  const dispatch = useDispatch();

  const theme = useSelector(selectors.theme);
  const topics = useSelector(selectors.topics);

  const { pathname, search } = useLocation();

  useEffect(() => {
    const topicsIsNone = Object.values(topics).every((topicCur) => {
      return Object.values(topicCur).every((variantCur) => {
        return !variantCur;
      });
    });

    if (topicsIsNone) {
      const defaultTopic: TopicValue = {
        key: TopicKeys.default,
        variant: 'static',
        value: true,
      };

      dispatch(actions.setTopic(defaultTopic));
    }

    localStorage.setItem('theme', JSON.stringify(theme));
    localStorage.setItem('topics', JSON.stringify(topics));
  }, []);

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
