import { useState } from 'react';
import { useDispatch } from 'react-redux';

import styled from 'astroturf/react';
import { TopicKeys } from '@enums';

import { actions } from '../../../store/main/slice';
import { topicAvailableVariants } from '../utils';

import { Variants } from './Variants';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  gap: 10px;
  color: #fff;
  cursor: pointer;
`;

export type TopicProps = {
  label: TopicKeys;
};

export const Topic = ({ label }: TopicProps) => {
  const dispatch = useDispatch();

  const [isClicked, setIsClicked] = useState(false);

  const clickHandler = () => {
    setIsClicked(!isClicked);

    if (!isClicked) {
      const availableVariants = topicAvailableVariants[label];

      availableVariants.forEach((variantCur) => {
        const value = {
          key: label,
          variant: variantCur,
          value: false,
        };

        dispatch(actions.setTopic(value));
      });
    }
  };

  let opacity = '0';

  if (isClicked) {
    opacity = '1';
  }

  const style = { opacity };

  return (
    <Wrapper>
      <div onClick={clickHandler}>
        {label}
      </div>

      <div style={style}>
        <Variants topicKey={label} />
      </div>
    </Wrapper>
  );
};
