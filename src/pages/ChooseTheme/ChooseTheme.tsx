import { Link } from 'react-router-dom';

import styled from 'astroturf/react';
import { Themes } from '@enums';

import { Theme } from './components/Theme';

const ExtraWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 50px;
`;

const ThemesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
`;

export const ChooseTheme = () => {
  return (
    <ExtraWrapper>
      <Wrapper>
        <ThemesWrapper>
          {Object.values(Themes).map((themeCur: Themes) => {
            return (
              <Theme key={themeCur} label={themeCur} />
            );
          })}
        </ThemesWrapper>

        <Link to="/">
          Next
        </Link>
      </Wrapper>
    </ExtraWrapper>
  );
};
