import { useState } from 'react';

import { nanoid } from 'nanoid';
import styled from 'astroturf/react';

import { Topics } from '@types';

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
  align-items: center;
  justify-content: center;
`;

const TopicStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  gap: 10px;
  color: #fff;
  
  &:global {
    &.isChecked {
      color: #666;
      opacity: 0.5;
      cursor: pointer;
    }
  }
`;

type TopicProps = {
  label: string;
};

const topicsToChoose: TopicProps[] = [
  {
    label: Topics.default,
  },
  {
    label: Topics.cyberpunk,
  },
  {
    label: Topics.synthwave,
  },
  {
    label: Topics.vaporwave,
  },
];

const Topic = ({ label }: TopicProps) => {
  const [chosen, setChosen] = useState(false);

  const clickHandler = () => {
    setChosen(!chosen);
  };

  let className = 'linkButton ';

  if (chosen) {
    className += 'isChecked';
  }

  return (
    <TopicStyled className={className} onClick={clickHandler}>
      {label}
    </TopicStyled>
  );
};

export const ChooseTopics = () => {
  return (
    <Wrapper>
      <TopicsWrapper>
        {topicsToChoose.map((topicToChooseCur) => {
          const { label } = topicToChooseCur;

          return (
            <Topic key={nanoid()} label={label} />
          );
        })}
      </TopicsWrapper>
    </Wrapper>
  );
};
