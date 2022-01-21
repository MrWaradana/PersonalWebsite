import React from 'react';

import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';
import Typical from 'react-typical';

const Hero = (props) => (
  <Section row nopadding>
    <LeftSection>
      <SectionTitle main center>
        Welcome To <br />
        My Personal Portfolio
      </SectionTitle>
      <SectionText>
        Muhammad Ridho Waradana
        <Typical
        loop={Infinity}
        wrapper='p'
        steps={[
          'Information System Student',1000,
          'Front-end Web Developer',1000,
          'Gamer',1500
        ]}
        />
      </SectionText>
      <Button onclick={() => window.location = 'https://google.com'}>Learn More</Button>
    </LeftSection>
  </Section>
);

export default Hero;