import { Link } from 'react-router-dom';

import styled from 'astroturf/react';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
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
  // todo: links to config of decoration theme and topics for content;

  return (
    <Wrapper>
      <LinksWrapper>
        <Link to="/widget">
          Modern browsers
        </Link>

        <Link to="/widget">
          Outdated browsers
        </Link>
      </LinksWrapper>
    </Wrapper>
  );
};
