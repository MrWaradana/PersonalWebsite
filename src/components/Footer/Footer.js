import React from 'react';
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { SiGmail, SiLine, SiWhatsapp } from "react-icons/si";
import { SocialIcons } from '../Header/HeaderStyles';
import { CompanyContainer, FooterWrapper, LinkColumn, LinkItem, LinkList, LinkTitle, Slogan, SocialContainer, SocialIconsContainer } from './FooterStyles';

const Footer = () => {
  return (
    <FooterWrapper>
      <LinkList>
        <LinkColumn>
          <LinkTitle>Whatsapp</LinkTitle>
          <LinkItem href='https://wa.me/6281219151401' target='_blank'><SiWhatsapp size='3rem' /> <br/> +62 812 1915 1401</LinkItem>
        </LinkColumn>
        <LinkColumn>
          <LinkTitle>Line</LinkTitle>
          <LinkItem href='https://line.me/ti/p/~mrwaradana' target='_blank'><SiLine size='3rem' /> <br/>mrwaradana</LinkItem>
        </LinkColumn>
        <LinkColumn>
          <LinkTitle>Email</LinkTitle>
          <LinkItem href='https://mail.google.com/mail/?view=cm&fs=1&to=muhammadridhowaradana@gmail.com&su=Greetings&body=Hi,...' target='_blank'><SiGmail size='3rem' /> <br/> muhammadridhowaradana@gmail.com</LinkItem>
        </LinkColumn>
      </LinkList>
      <SocialIconsContainer>
        <CompanyContainer>
          <Slogan>If you're reading this, you are awesome!</Slogan>
        </CompanyContainer>
        <SocialContainer>
          <SocialIcons href="https://github.com/MrWaradana" target="_blank">
            <AiFillGithub size="3rem" />
          </SocialIcons>
          <SocialIcons href="https://linkedin.com/in/mrwaradana" target="_blank">
            <AiFillLinkedin size="3rem" />
          </SocialIcons>
          <SocialIcons href="https://instagram.com/mrwaradana" target="_blank">
            <AiFillInstagram size="3rem" />
          </SocialIcons>
        </SocialContainer>
      </SocialIconsContainer>
    </FooterWrapper>
  );
};

export default Footer;
