import React from 'react';

import styled from 'astroturf/react';

const Wrapper = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  font-family: 'Avenir LT Std 95 Black Oblique';
  font-size: 98px;
  color: #fff;
`;

export const MainQuestion = () => {
  return (
    <Wrapper>
      <Text>
        Will you marry me, Polina?
      </Text>
    </Wrapper>
  );
};
