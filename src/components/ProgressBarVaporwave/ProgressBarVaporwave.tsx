import { useEffect, useState } from 'react';

import styled from 'astroturf/react';
import { getValuesForProgressBar, twoDigitsAlways } from 'm-days-core/utils';

import { Themes } from '@types';

import { Weather } from 'components/Weather';

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
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 250px;
  // height: 245px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 80px;
  color: #fff;
  opacity: 0.65;
`;

const Progress = styled.div`
  width: 80%;
  height: 8px;
  background: #3d3d3d;
  margin-top: 15px;
`;

const ProgressWalking = styled.div`
  height: 8px;
  background: #fff;
`;

const Date = styled.div`
  font-family: 'Digital-Cyrillic';
  font-size: 24px;
  color: #fff;
`;

const Time = styled.div`
  font-family: 'Digital-Cyrillic';
  font-size: 100px;
  color: #fff;
  margin-top: 2px;
`;

export const ProgressBarVaporwave = () => {
  const initValues = getValuesForProgressBar();

  const [values, setValues] = useState(initValues);

  useEffect(() => {
    const interval = setInterval(() => {
      const newValues = getValuesForProgressBar();

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
    month,
    hours,
    minutes,
    progressFull,
  } = values;

  const dayToPrint = twoDigitsAlways(day);
  const monthToPrint = twoDigitsAlways(month);
  const hoursToPrint = twoDigitsAlways(hours);
  const minutesToPrint = twoDigitsAlways(minutes);

  return (
    <Wrapper>
      <Shadow>
        <Weather theme={Themes.vaporwave} />

        <ContentWrapper>
          <Date>
            {`${dayToPrint}.${monthToPrint}.${year}`}
          </Date>

          <Time>
            {`${hoursToPrint}:${minutesToPrint}`}
          </Time>

          <Progress>
            <ProgressWalking style={{ width: `${progressFull}%` }} />
          </Progress>
        </ContentWrapper>
      </Shadow>
    </Wrapper>
  );
};