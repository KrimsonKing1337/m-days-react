import styled from 'astroturf/react';
import { TopicKeys } from '@enums';

import { topicAvailableStates } from './utils';
import { Topic } from './components/Topic';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const TopicsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
`;

export const ChooseTopics = () => {
  return (
    <Wrapper>
      <TopicsWrapper>
        {Object.keys(topicAvailableStates).map((keyCur) => {
          const key = keyCur as TopicKeys;

          return (
            <Topic
              key={key}
              label={key}
            />
          );
        })}
      </TopicsWrapper>

      Next
    </Wrapper>
  );
};
