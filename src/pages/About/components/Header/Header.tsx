import { PropsWithChildren } from 'react';

import styled from 'astroturf/react';

const Wrapper = styled.div`
  text-decoration: underline;
  font-size: 32px;
  color: #fff;
  margin-bottom: 15px;
`;

export const Header = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
};
