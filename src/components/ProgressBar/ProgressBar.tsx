import React, { useEffect, useState } from 'react';

import styled from 'astroturf/react';

import { Weather } from 'components/Weather';

import { twoDigitsAlways } from 'utils/twoDigitsAlways';

import { getValues } from './utils';

const Wrapper = styled.div`
  user-select: none;

  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

const Shadow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 250px;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 2%;
  color: #fff;
  opacity: 0.65;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Left = styled(Block)`
  max-width: 30%;
`;

const Center = styled(Block)`
  flex-shrink: 1;
`;

const Right = styled(Block)`
  max-width: 30%;
`;

const Year = styled.span`
  font-family: 'Avenir LT Std 95 Black Oblique';
  font-size: 51px;
  color: #fff;
`;

const Month = styled.span`
  font-family: 'Avenir LT Std 35 Light Oblique';
  font-size: 38px;
  margin-top: 15px;
  padding-top: 8px;
  color: #fff;
  background: #020202;
`;

const Day = styled.span`
  font-family: 'Avenir LT Std 35 Light Oblique';
  font-size: 38px;
  margin-top: 15px;
  color: #fff;
`;

const Time = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
`;

const HoursOrMinutes = styled.span`
  font-family: 'Avenir LT Std 95 Black Oblique';
  font-size: 98px;
  color: #fff;
`;

const Seconds = styled.span`
  font-family: 'Avenir LT Std 35 Light';
  font-size: 59px;
  font-style: italic;
  margin-left: 10px;
  top: -5px;
  color: #fff;
  width: 80px;
`;

const Progress = styled.div`
  width: 100%;
  height: 30px;
  background: #3d3d3d;
`;

const ProgressWalking = styled.div`
  height: 30px;
  background: #fff;
`;

const Percent = styled.span`
  font-family: 'Avenir LT Std 95 Black Oblique';
  font-size: 51px;
  color: #fff;
`;

const PercentFull = styled.span`
  font-family: 'Avenir LT Std 35 Light Oblique';
  font-size: 38px;
  background: #020202;
  margin-top: 15px;
  padding-top: 8px;
  color: #fff;
`;

export const ProgressBar = () => {
  const initValues = getValues();

  const [values, setValues] = useState(initValues);

  useEffect(() => {
    const interval = setInterval(() => {
      const newValues = getValues();

      setValues(newValues);
    }, 100);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  const {
    year,
    day,
    nameOfDay,
    month,
    hours,
    minutes,
    seconds,
    progressFull,
    dayOfYear,
    daysInYear,
    progressShort,
  } = values;

  const monthToPrint = twoDigitsAlways(month);
  const hoursToPrint = twoDigitsAlways(hours);
  const minutesToPrint = twoDigitsAlways(minutes);
  const secondsToPrint = twoDigitsAlways(seconds);

  return (
    <Wrapper>
      <Shadow>
        <Weather />

        <ContentWrapper>
          <Left>
            <Year>
              {year}
            </Year>

            <Month>
              {`${day}.${monthToPrint} ${nameOfDay}`}
            </Month>
          </Left>

          <Center>
            <Time>
              <HoursOrMinutes>
                {`${hoursToPrint}:`}
              </HoursOrMinutes>

              <HoursOrMinutes>
                {minutesToPrint}
              </HoursOrMinutes>

              <Seconds>
                {secondsToPrint}
              </Seconds>
            </Time>

            <Progress>
              <ProgressWalking style={{ width: `${progressFull}%` }} />
            </Progress>

            <Day>
              {`${dayOfYear} of ${daysInYear} monochrome days`}
            </Day>
          </Center>

          <Right>
            <Percent>
              {`${progressShort}%`}
            </Percent>

            <PercentFull>
              {`${progressFull}%`}
            </PercentFull>
          </Right>
        </ContentWrapper>
      </Shadow>
    </Wrapper>
  );
};
