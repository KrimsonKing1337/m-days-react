import { useState } from 'react';

import styled from 'astroturf/react';
import { TopicKeys } from '@enums';

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
  const [isClicked, setIsClicked] = useState(false);

  const clickHandler = () => {
    setIsClicked(!isClicked);
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
