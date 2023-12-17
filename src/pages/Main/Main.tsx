import { Link } from 'react-router-dom';

import styled from 'astroturf/react';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

export const Main = () => {
  // todo: links to config of decoration theme and topics for content;

  return (
    <Wrapper>
      <Link to="/widget">
        Go to the widget
      </Link>
    </Wrapper>
  );
};
