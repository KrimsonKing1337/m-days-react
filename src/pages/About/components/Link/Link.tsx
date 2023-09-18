import { PropsWithChildren } from 'react';

import styled from 'astroturf/react';

const Wrapper = styled.a`
  font-family: "ProximaNovaRegular";
  text-decoration: underline;
  color: #fff;
  transition: ease opacity 0.3s 0s;
`;

export type LinkProps = {
  href: string;
};

export const Link = ({ children, href }: PropsWithChildren<LinkProps>) => {
  return (
    <Wrapper href={href} target="_blank" rel="noreferrer noopener">
      {children}
    </Wrapper>
  );
};
