import { PropsWithChildren } from 'react';

import styled from 'astroturf/react';

const Wrapper = styled.div`
  font-family: "ProximaNovaRegular";
  text-decoration: underline;
  color: #fff;
  transition: ease opacity 0.3s 0s;

  &:hover {
    color: #666;
    opacity: 0.5;
    cursor: pointer;
  }
  
  &:global {
    &.isChecked {
      color: #666;
      opacity: 0.5;
      cursor: pointer;
    }
  }
`;

export type LinkButtonProps = {
  isChecked: boolean;
  onClick: () => void;
};

export const LinkButton = ({ children, isChecked, onClick  }: PropsWithChildren<LinkButtonProps>) => {
  const className = isChecked ? 'isChecked' : '';

  return (
    <Wrapper className={className} onClick={onClick}>
      {children}
    </Wrapper>
  );
};
