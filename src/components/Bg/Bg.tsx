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

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: no-repeat;
  background-size: cover;
`;

let interval: ReturnType<typeof setInterval> | null = null;

export const Bg = () => {
  const [img, setImg] = useState('');

  useEffect(() => {
    const imgChange = async () => {
      const random = randomInt(0, imgs.length);
      const fileName = `img_bg/1920/${imgs[random]}`;

      setImg(fileName);
    };

    imgChange();

    interval = setInterval(() => {
      imgChange();
    }, 12000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [imgs]);

  return (
    <ExtraWrapper>
      <Wrapper style={{ backgroundImage: `url(${img})` }} />

      <ProgressBar />
    </ExtraWrapper>
  );
};
