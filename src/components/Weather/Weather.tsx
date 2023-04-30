import React, { useEffect, useState } from 'react';

import styled from 'astroturf/react';
import { getCurrentWeather } from 'api';

import type { WeatherResp } from '@types';

import { getCurrentPosition } from 'utils/gpsApi';

const Wrapper = styled.div`
  position: absolute;
  top: 50px;
  left: 50px;
  z-index: 1;
  font-family: "Avenir LT Std 35 Light Oblique";
  font-size: 38px;
  color: #fff;
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

      setWeather(weather);
    };

    updateWeather();

    setInterval(() => {
      updateWeather();
    }, 900000); // each 15 minutes
  }, [geolocation]);

  const showWeather = !!weather;

  const temperatureIsNotSubZero = weather?.current_weather.temperature && weather?.current_weather.temperature > 0;
  const signNearTheTemperature = temperatureIsNotSubZero ? '+' : '-';

  return (
    <>
      {showWeather && (
        <Wrapper>
          {signNearTheTemperature}
          {weather?.current_weather.temperature}
          °C
        </Wrapper>
      )}
    </>
  );
};
