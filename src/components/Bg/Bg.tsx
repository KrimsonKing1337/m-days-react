import React from 'react';

import styled from 'styled-components';

import { ProgressBar } from 'components/ProgressBar';

const ExtraWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: url('/img_bg/1920/0-_t5Je_L9.jpg');
`;

export const Bg = () => {
  return (
    <ExtraWrapper>
      <Wrapper />

      <ProgressBar />
    </ExtraWrapper>
  );
};
