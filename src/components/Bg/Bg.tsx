import React, { useEffect, useRef, useState } from 'react';

import styled from 'astroturf/react';
import axios from 'axios';

import type { Weather } from '@types';

import BatteryLowIcon from 'assets/icons/i-battery-low.svg';

import { ProgressBar } from 'components/ProgressBar';

import { startBatteryWatch } from 'utils/batteryApi';
import { getCurrentPosition } from 'utils/gpsApi';

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

const BatteryWarning = styled.div`
  position: absolute;
  top: 50px;
  right: 50px;
  z-index: 1;
  opacity: 0.5;
  animation: blink-animation 0.5s infinite;
  animation-direction: alternate-reverse;
  
  svg {
    transform: scale(2);
    
    * {
      stroke: #FF0000;
    }
  }

  @keyframes blink-animation {
    to {
      opacity: 1;
    }
  }
`;

const WeatherStyled = styled.div`
  position: absolute;
  top: 50px;
  left: 50px;
  z-index: 1;
  font-family: "Avenir LT Std 35 Light Oblique";
  font-size: 38px;
  color: #fff;
`;
//# endregion styles

export const Bg = () => {
  const [geolocation, setGeolocation] = useState<GeolocationCoordinates | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);

  const [batteryIsLow, setBatteryIsLow] = useState(false);
  const [batteryIsCharging, setBatteryIsCharging] = useState(false);

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

  useEffect(() => {
    startBatteryWatch(
      (isLow) => setBatteryIsLow(isLow),
      (isCharging) => setBatteryIsCharging(isCharging),
    );
  }, []);

  useEffect(() => {
    getCurrentPosition(
      (pos) => setGeolocation(pos.coords),
      () => setGeolocation(null),
    );
  }, []);

  useEffect(() => {
    if (!geolocation) {
      return;
    }

    (async () => {
      const { latitude, longitude } = geolocation;

      const result = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
      );

      setWeather(result.data);
    })();
  }, [geolocation]);

  const opacity = isChanging ? 0 : 1;
  const showBatteryLowIcon = batteryIsLow && !batteryIsCharging;
  const showWeather = !!weather;

  const temperatureIsNotSubZero = weather?.current_weather.temperature && weather?.current_weather.temperature > 0;
  const signNearTheTemperature = temperatureIsNotSubZero ? '+' : '-';

  return (
    <ExtraWrapper>
      {showWeather && (
        <WeatherStyled>
          {signNearTheTemperature}
          {weather?.current_weather.temperature}
          °C
        </WeatherStyled>
      )}

      {showBatteryLowIcon && (
        <BatteryWarning>
          <BatteryLowIcon />
        </BatteryWarning>
      )}

      <NextImgCache style={{ backgroundImage: `url(${nextImg})` }} />

      <AnimWrapper style={{ opacity: opacity }}>
        <Wrapper style={{ backgroundImage: `url(${img})` }} />
      </AnimWrapper>

      <ProgressBar />
    </ExtraWrapper>
  );
};
