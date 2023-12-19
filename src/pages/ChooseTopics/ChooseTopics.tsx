import { Link } from 'react-router-dom';

import styled from 'astroturf/react';
import { TopicKeys } from '@enums';

import { topicAvailableVariants } from './utils';
import { Topic } from './components/Topic';

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

const TopicsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
`;

export const ChooseTopics = () => {
  return (
    <ExtraWrapper>
      <Wrapper>
        <TopicsWrapper>
          {Object.keys(topicAvailableVariants).map((keyCur) => {
            const key = keyCur as TopicKeys;

            return (
              <Topic
                key={key}
                label={key}
              />
            );
          })}
        </TopicsWrapper>

        <Link to="/">
          Next
        </Link>
      </Wrapper>
    </ExtraWrapper>
  );
};
