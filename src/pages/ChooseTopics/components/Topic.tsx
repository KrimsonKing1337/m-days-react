import styled from 'astroturf/react';

import { TopicKeys } from '@types';

import { Variants } from './Variants';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  gap: 10px;
  color: #fff;
`;

export type TopicProps = {
  label: TopicKeys;
};

export const Topic = ({ label }: TopicProps) => {
  return (
    <Wrapper>
      {label}

      <Variants topicKey={label} />
    </Wrapper>
  );
};
