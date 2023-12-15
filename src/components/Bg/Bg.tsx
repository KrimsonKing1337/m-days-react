import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import styled from 'astroturf/react';

import { selectors } from 'store/main/selectors';

import { ProgressBarVaporwave } from 'components/ProgressBarVaporwave';
import { ProgressBar } from 'components/ProgressBar';
import { Battery } from 'components/Battery';

import { Themes } from '../../@types';

import { fetchImage } from './utils';

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

const QrImg = styled.img`
  position: absolute;
  right: 50px;
  bottom: 50px;
  z-index: 1;
  height: 125px;
  width: 125px;
`;
//# endregion styles

export const Bg = () => {
  const theme = useSelector(selectors.theme);

  const [isChanging, setIsChanging] = useState(false);
  const [img, setImg] = useState('');

  const [nextImg, setNextImg] = useState('');
  const nextImgRef = useRef('');

  useEffect(() => {
    const init = async () => {
      const nextImage = await fetchImage();

      setNextImg(nextImage);
    };

    init();
  }, []);

  useEffect(() => {
    nextImgRef.current = nextImg;
  }, [nextImg]);

  useEffect(() => {
    const imgChange = async () => {
      const nextImage = await fetchImage();

      setImg(nextImgRef.current);
      setNextImg(nextImage);
    };

    imgChange();

    const interval = setInterval(async () => {
      setIsChanging(true);

      setTimeout(async () => {
        await imgChange();
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
      <QrImg src="icons/qr.png" alt="" />

      <Battery />

      <NextImgCache style={{ backgroundImage: `url(${nextImg})` }} />

      <AnimWrapper style={{ opacity: opacity }}>
        <Wrapper style={{ backgroundImage: `url(${img})` }} />
      </AnimWrapper>

      <ProgressBarComponent />
    </ExtraWrapper>
  );
};
