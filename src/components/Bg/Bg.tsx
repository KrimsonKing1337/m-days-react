import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import styled from 'astroturf/react';

import { selectors } from 'store/main/selectors';

import { ProgressBarVaporwave } from 'components/ProgressBarVaporwave';
import { ProgressBar } from 'components/ProgressBar';
import { Battery } from 'components/Battery';

import { Themes } from '../../@types';

import { getRandomImgPath } from './utils';

//# region styles
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
  background: no-repeat center;
  background-size: cover;
`;

const NextImgCache = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  height: 100px;
  width: 100px;
  opacity: 0;
`;
//# endregion styles

export const Bg = () => {
  const theme = useSelector(selectors.theme);

  const [isChanging, setIsChanging] = useState(false);
  const [img, setImg] = useState('');

  const nextImgInitValue = getRandomImgPath();
  const [nextImg, setNextImg] = useState(nextImgInitValue);
  const nextImgRef = useRef(nextImgInitValue);

  useEffect(() => {
    nextImgRef.current = nextImg;
  }, [nextImg]);

  useEffect(() => {
    const imgChange = () => {
      const nextImgNewValue = getRandomImgPath();

      setImg(nextImgRef.current);
      setNextImg(nextImgNewValue);
    };

    imgChange();

    const interval = setInterval(() => {
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
  }, []);

  const opacity = isChanging ? 0 : 1;

  const ProgressBarComponent = () => {
    if (theme === Themes.vaporwave) {
      return (
        <ProgressBarVaporwave />
      );
    }

    return (
      <ProgressBar />
    );
  };

  return (
    <ExtraWrapper>
      <Battery />

      <NextImgCache style={{ backgroundImage: `url(${nextImg})` }} />

      <AnimWrapper style={{ opacity: opacity }}>
        <Wrapper style={{ backgroundImage: `url(${img})` }} />
      </AnimWrapper>

      <ProgressBarComponent />
    </ExtraWrapper>
  );
};
