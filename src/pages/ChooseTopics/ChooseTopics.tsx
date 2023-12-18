import { useDispatch, useSelector } from 'react-redux';

import styled from 'astroturf/react';

import { Topics, TopicState } from '@types';

import { actions } from 'store/main/slice';
import { selectors } from 'store/main/selectors';

import { topicAvailableStates } from './utils';

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

const TopicStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  gap: 10px;
  color: #fff;
`;

const VariantsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 6px;
`;

const Variant = styled.div`
  &:global {
    &.isChecked {
      color: #666;
      opacity: 0.5;
      cursor: pointer;
    }
  }
`;

type TopicProps = {
  label: Topics;
};

const Topic = ({ label }: TopicProps) => {
  const dispatch = useDispatch();

  const topics = useSelector(selectors.topics);

  const variants = topicAvailableStates[label];

  const clickHandler = (variant: TopicState) => {
    const topic = topics[label];

    const stateValueCur = topic[variant];

    const newValue = {
      key: label,
      state: variant,
      value: !stateValueCur,
    };

    dispatch(actions.setTopic(newValue));
  };

  return (
    <TopicStyled>
      {label}

      <VariantsWrapper>
        {variants.map((variantCur) => {
          const topic = topics[label];

          let className = 'linkButton ';

          if (topic[variantCur]) {
            className += 'isChecked';
          }

          return (
            <Variant
              key={variantCur}
              className={className}
              onClick={() => clickHandler(variantCur)}
            >
              {variantCur}
            </Variant>
          );
        })}
      </VariantsWrapper>
    </TopicStyled>
  );
};

export const ChooseTopics = () => {
  return (
    <Wrapper>
      <TopicsWrapper>
        {Object.keys(topicAvailableStates).map((keyCur) => {
          const key = keyCur as Topics;

          return (
            <Topic
              key={key}
              label={key}
            />
          );
        })}
      </TopicsWrapper>
    </Wrapper>
  );
};
