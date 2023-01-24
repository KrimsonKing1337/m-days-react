import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import imgs from 'img_bg.json';

import { ProgressBar } from 'components/ProgressBar';

import { randomInt } from 'utils/randomInt';

const ExtraWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const AnimWrapper = styled.div`
  height: 100%;
  width: 100%;
  opacity: 1;
  transition: opacity ease 0.3s 0s;
  will-change: opacity;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: no-repeat;
  background-size: cover;
`;

let interval: ReturnType<typeof setInterval> | null = null;

export const Bg = () => {
  const [isChanging, setIsChanging] = useState(false);
  const [img, setImg] = useState('');

  useEffect(() => {
    const imgChange = () => {
      const random = randomInt(0, imgs.length);
      const fileName = `img_bg/1920/${imgs[random]}`;

      setImg(fileName);
    };

    imgChange();

    interval = setInterval(() => {
      setIsChanging(true);

      setTimeout(() => {
        imgChange();
      }, 300); // transition duration

      setTimeout(() => {
        setIsChanging(false);
      }, 700);
    }, 12000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [imgs]);

  const opacity = isChanging ? 0 : 1;

  return (
    <ExtraWrapper>
      <AnimWrapper style={{ opacity: opacity }}>
        <Wrapper style={{ backgroundImage: `url(${img})` }} />
      </AnimWrapper>

      <ProgressBar />
    </ExtraWrapper>
  );
};
