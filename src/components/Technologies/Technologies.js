import React from 'react';
import { DiBootstrap, DiCss3, DiHtml5, DiJqueryLogo, DiLaravel, DiReact} from 'react-icons/di';
import { SiJavascript, SiFigma, SiTailwindcss, SiNextDotJs } from "react-icons/si";
import { Section, SectionDivider, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import { List, ListContainer, ListItem, ListParagraph, ListTitle } from './TechnologiesStyles';

const Technologies = () =>  (
  <Section id="tech">
    <SectionDivider/>
    <SectionTitle>Technologies</SectionTitle>
    <SectionText>
      These are the technologies that I'm familiar and currently learning with at the Web Development
    </SectionText>
    <List>
      <ListItem>
        <DiReact size="3rem"/>
        <ListContainer>
          <ListTitle>React</ListTitle>
          <ListParagraph>
            Currently learning <br/>
            React
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <SiNextDotJs size="3rem"/>
        <ListContainer>
          <ListTitle>Next.js</ListTitle>
          <ListParagraph>
            Currently learning <br/>
            Next.js
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <SiTailwindcss size="3rem"/>
        <ListContainer>
          <ListTitle>Tailwind CSS</ListTitle>
          <ListParagraph>
            Currently learning <br/>
            Tailwind CSS
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <SiFigma size="3rem"/>
        <ListContainer>
          <ListTitle>Figma</ListTitle>
          <ListParagraph>
            Design UI with <br/>
            Figma
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <DiLaravel size="3rem"/>
        <ListContainer>
          <ListTitle>Laravel</ListTitle>
          <ListParagraph>
            Experience with <br/>
            Laravel
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <DiBootstrap size="3rem"/>
        <ListContainer>
          <ListTitle>Bootstrap</ListTitle>
          <ListParagraph>
            Experience with <br/>
            Bootstrap
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <DiJqueryLogo size="3rem"/>
        <ListContainer>
          <ListTitle>Jquery</ListTitle>
          <ListParagraph>
            Experience with <br/>
            Jquery
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <DiHtml5 size="3rem"/>
        <ListContainer>
          <ListTitle>HTML</ListTitle>
          <ListParagraph>
            Experience with <br/>
            HTML
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <DiCss3 size="3rem"/>
        <ListContainer>
          <ListTitle>CSS</ListTitle>
          <ListParagraph>
            Experience with <br/>
            CSS
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <SiJavascript size="3rem"/>
        <ListContainer>
          <ListTitle>Javascript</ListTitle>
          <ListParagraph>
            Experience with <br/>
            Javascript
          </ListParagraph>
        </ListContainer>
      </ListItem>
    </List>
  </Section>
);

export default Technologies;
