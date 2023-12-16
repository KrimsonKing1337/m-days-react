import { memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import styled from 'astroturf/react';

import { selectors } from 'store/main/selectors';

import { Battery } from 'components/Battery';
import { Weather } from 'components/Weather';

import { fetchImage, getProgressBarComponent } from './utils';

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

const MemoizedWeather = memo(Weather);
const MemoizedBattery = memo(Battery);

const MemoizedQrImg = memo(QrImg);

export const Bg = () => {
  const theme = useSelector(selectors.theme);

  const [isChanging, setIsChanging] = useState(false);
  const [img, setImg] = useState('');

  const [nextImg, setNextImg] = useState('');
  const nextImgRef = useRef('');

  useEffect(() => {
    const init = async () => {
      const initImage = await fetchImage();

      setImg(initImage);
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

  const ProgressBarComponent = () => getProgressBarComponent(theme);

  return (
    <ExtraWrapper>
      <MemoizedWeather theme={theme} />

      <MemoizedQrImg src="icons/qr.png" alt="" />

      <MemoizedBattery />

      <NextImgCache style={{ backgroundImage: `url(${nextImg})` }} />

      <AnimWrapper style={{ opacity: opacity }}>
        <Wrapper style={{ backgroundImage: `url(${img})` }} />
      </AnimWrapper>

      <ProgressBarComponent />
    </ExtraWrapper>
  );
};
