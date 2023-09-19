import { Link } from 'react-router-dom';

import styled from 'astroturf/react';

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  margin-bottom: 25px;

  a {
    display: block;
  }
`;

const Logo = styled.div`
  width: 150px;
  height: 150px;
  text-align: center;
  margin: 0 auto 20px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 48px;
  margin: 0 auto 30px;
`;

const Item = styled.div`
  text-align: center;
  font-size: 24px;
  line-height: 1.2;
  margin: 30px auto 0;

  &:nth-child(1) {
    margin-top: 0;
  }
`;

export const Menu = () => {
  return (
    <Wrapper>
      <Logo>
        <img src="/img/logo.png" alt="" />
      </Logo>

      <Title>
        Monochrome days
      </Title>

      <div>
        <Item>
          Photo project for bwlovers. Our website
          <br />
          displays the percentage of days passed this year
          <br />
          accompanied with best author&apos;s photos.
        </Item>

        <Item>
          <Link to="/">
            Go to main
          </Link>

          <Link to="/about">
            More about us
          </Link>

          <Link to="/config">
            Config
          </Link>
        </Item>
      </div>
    </Wrapper>
  );
};