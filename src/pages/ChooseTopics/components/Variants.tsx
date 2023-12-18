import { useDispatch, useSelector } from 'react-redux';

import styled from 'astroturf/react';

import { TopicKeys, TopicVariantValue } from '@types';

import { selectors } from 'store/main/selectors';

import { topicAvailableStates } from '../utils';
import { LinkButton } from '../../../components/LinkButton';
import { actions } from '../../../store/main/slice';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 6px;
`;


export type VariantProps = {
  topicKey: TopicKeys;
};

export const Variants = ({ topicKey }: VariantProps) => {
  const dispatch = useDispatch();

  const topics = useSelector(selectors.topics);

  const variants = topicAvailableStates[topicKey];

  const clickHandler = (variant: TopicVariantValue) => {
    const topic = topics[topicKey];

    const stateValueCur = topic[variant];

    const newValue = {
      key: topicKey,
      variant,
      value: !stateValueCur,
    };

    dispatch(actions.setTopic(newValue));
  };

  return (
    <Wrapper>
      {variants.map((variantCur) => {
        const topic = topics[topicKey];
        const isChecked = topic[variantCur] || false;

        return (
          <LinkButton
            key={variantCur}
            isChecked={isChecked}
            onClick={() => clickHandler(variantCur)}
          >
            {variantCur}
          </LinkButton>
        );
      })}
    </Wrapper>
  );
};
