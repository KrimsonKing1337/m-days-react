import styled from 'astroturf/react';
import { nanoid } from 'nanoid';

import { Header, Member } from './components';
import { members, owners } from './utils';

const Wrapper = styled.div`
  width: 100%;
  padding-top: 50px;
  padding-left: 300px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  
  &:nth-child(1) {
    padding-top: 0;
  }
`;

const MembersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-right: 50px;
  padding-bottom: 15px;
`;

const MemberStyled = styled(Member)`
  margin-right: 50px;
  margin-bottom: 15px;
`;

export const About = () => {
  return (
    <Wrapper>
      <Section>
        <Header>
          Project Owners
        </Header>

        <MembersWrapper>
          {owners.map((ownerCur) => {
            const { img, firstName, lastName, href } = ownerCur;

            return (
              <MemberStyled
                key={nanoid()}
                imgSrc={img}
                firstName={firstName}
                lastName={lastName}
                href={href}
              />
            );
          })}
        </MembersWrapper>
      </Section>

      <Section>
        <Header>
          Project Members
        </Header>

        <MembersWrapper>
          {members.map((memberCur) => {
            const { img, firstName, lastName, href } = memberCur;

            return (
              <MemberStyled
                key={nanoid()}
                imgSrc={img}
                firstName={firstName}
                lastName={lastName}
                href={href}
              />
            );
          })}
        </MembersWrapper>
      </Section>
    </Wrapper>
  );
};
