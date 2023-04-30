import React, { useEffect, useState } from 'react';

import styled from 'astroturf/react';

import BatteryLowIcon from 'assets/icons/i-battery-low.svg';

import { startBatteryWatch } from 'utils/batteryApi';

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

export const Battery = () => {
  const [batteryIsLow, setBatteryIsLow] = useState(false);
  const [batteryIsCharging, setBatteryIsCharging] = useState(false);

  useEffect(() => {
    startBatteryWatch({
      updateLevelInfoCb: (isLow) => setBatteryIsLow(isLow),
      updateChargeInfoCb: (isCharging) => setBatteryIsCharging(isCharging),
    });
  }, []);

  const showBatteryLowIcon = batteryIsLow && !batteryIsCharging;
  
  return (
    <>
      {showBatteryLowIcon && (
        <BatteryWarning>
          <BatteryLowIcon />
        </BatteryWarning>
      )}
    </>
  );
};
