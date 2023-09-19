import { useSelector } from 'react-redux';

import styled from 'astroturf/react';

import { mainSelectors } from 'store/main';

import { Menu } from 'components/Menu';

//#region styles
const Wrapper = styled.div`
  position: fixed;
  z-index: 5;
  width: 100%;
  height: 100vh;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: auto;
  padding-top: 100px;
  padding-bottom: 25px;
  font-family: "ProximaNovaAltThin", Arial, sans-serif;
  font-weight: lighter;
  color: #fff;
  background: rgba(0, 0, 0, 0.95);
  transform: translateY(-200vh) translateZ(0);
  transition: all ease 0.3s 0s;
  will-change: transform;
  
  &:global {
    &.isActive {
      transform: translateY(0) translateZ(0);
    } 
  }
`;
//#endregion styles

const Content = styled.div`
  position: relative;
  width: 960px;
  margin: 0 auto;
`;

export const Popup = () => {
  const popupIsActive = useSelector(mainSelectors.popupIsActive);

  const className = popupIsActive ? 'isActive' : '';

  return (
    <Wrapper className={className}>
      <Content>
        <Menu />
      </Content>
    </Wrapper>
  );
};
