import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import styled from 'astroturf/react';

import { actions } from 'store/main/slice';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  opacity: 0;
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  line-height: 1.2;
  gap: 15px;
`;

export const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const localStorageTheme = localStorage.getItem('theme');
    const localStorageTopics = localStorage.getItem('topics');

    if (localStorageTheme && localStorageTopics) {
      const values = {
        topics: JSON.parse(localStorageTopics),
        theme: JSON.parse(localStorageTheme),
      };

      dispatch(actions.setThemeAndTopics(values));

      navigate('/widget');
    } else {
      if (wrapperRef.current) {
        wrapperRef.current.style.opacity = '1';
      }
    }
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <LinksWrapper>
        <Link to="/choose-topics">
          Modern browsers
        </Link>

        <a href="/legacy">
          Outdated browsers
        </a>
      </LinksWrapper>
    </Wrapper>
  );
};
