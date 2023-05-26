import React, { useEffect, useState } from 'react';

import styled from 'astroturf/react';
import { getCurrentWeather, getDailyWeather, getHourlyWeather } from 'api';

import type { WeatherResp } from '@types';

import { getCurrentPosition } from 'utils/gpsApi';

import { getIconSrc } from './utils';

const Wrapper = styled.div`
  position: absolute;
  top: 50px;
  left: 50px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  gap: 12px;
  opacity: 0.65;
`;

const Value = styled.div`
  font-family: "Avenir LT Std 35 Light Oblique";
  font-size: 38px;
  color: #fff;
`;

const IconWrapper = styled.div`
  height: 64px;
  width: 64px;
  
  img {
    width: 100%;
  }
`;

export const Weather = () => {
  const [geolocation, setGeolocation] = useState<GeolocationCoordinates | null>(null);
  const [weather, setWeather] = useState<WeatherResp | null>(null);

  useEffect(() => {
    getCurrentPosition({
      successCb: (pos) => setGeolocation(pos.coords),
      errorCb: () => setGeolocation(null),
    });
  }, []);

  useEffect(() => {
    if (!geolocation) {
      return;
    }

    const updateWeather = async () => {
      const { latitude, longitude } = geolocation;

      const weather = await getCurrentWeather({ latitude, longitude });

      await getHourlyWeather({ latitude, longitude });
      await getDailyWeather({ latitude, longitude });

      // await getYandexWeather();

      setWeather(weather);
    };

    updateWeather();

    setInterval(() => {
      updateWeather();
    }, 900000); // each 15 minutes
  }, [geolocation]);

  if (!weather || !weather.current_weather) {
    return null;
  }

  const { temperature, weathercode, is_day } = weather.current_weather;

  const temperatureIsNotSubZero = temperature > 0;
  const signNearTheTemperature = temperatureIsNotSubZero ? '+' : '-';

  const iconSrc = getIconSrc(weathercode, is_day);
  const iconSrcReady = `icons/weather/${iconSrc}`;

  return (
    <Wrapper>
      {iconSrc && (
        <IconWrapper>
          <img src={iconSrcReady} alt="" />
        </IconWrapper>
      )}

      <Value>
        {signNearTheTemperature}
        {temperature}
        °C
      </Value>
    </Wrapper>
  );
};
