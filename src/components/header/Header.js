import React, { useState } from 'react';
import styled from 'styled-components';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { Link, NavLink } from 'react-router-dom';
import { mainBg, altBg, mainLight } from '../../utilities/colors';

const MainHeader = styled.div`
  width: 100%;
  height: 6em;
  text-align: center;
  background-color: ${mainBg};
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  border-bottom: 0.4em solid ${altBg};
`;
const Title = styled.h1`
  position: relative;
  font-size: 2.2rem;
  font-weight: 500;
  padding: 0.4em;
  margin-top: -0.2em;
  @media (max-width: 600px){
    font-size: 1.8rem;
  }
`;
const TitleLink = styled(Link)`
  text-decoration: none;
  color: ${mainLight};
`;
const MenuButton = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: flex;
    justify-content: space-around;
    position: relative;
    top: -20px;
    float: right;
    margin-right: 10px;
    background: ${altBg};
    outline: none;
    cursor: pointer;
    width: 70px;
    border: 1px solid ${mainBg};
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 1.2rem;
    z-index: 3;
    & > h4 {
      margin: 0;
      margin: 3px 0 0 0;
      font-weight: bolder;
    }
    &:hover {
      background: ${mainLight};
    }
  }
`;
const BlurDiv = styled.div`
  right: -20vw;
  transition: right 350ms ease-in-out;
  @media (max-width: 600px){
    position: fixed;
    height: 100vh;
    width: 20vw;
    right: ${props => props.open === false ? '-20vw' : '0'};
    top: 0;
    background-color: gray;
    opacity: 0.5;
    z-index: 2;
  }
`;
const Nav = styled.nav`
  position: relative;
  background: ${altBg};
  right: 0;
  left: 0;
  top: 0;
  
  @media (max-width: 600px) {
    position: fixed;
    width: 80vw;
    height: 100vh;
    z-index: 5;
    // right: 0;
    left: ${props => props.open === false ? '-80vw' : '0'};
    top: 0;
    opacity: none;
    transition: left 350ms ease-in-out;
  }
`;
const LinkWrapper = styled.ul`
  display: flex;
  justify-content: space-around;
  max-width: 600px;
  margin: 0 auto;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
const LinkList = styled.li`
  list-style: none;
`;
const SingleLink = styled(NavLink)`
  color: ${mainBg};
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 5px 10px;
  @media (max-width: 600px) {
    flex-direction: column;
    margin-left: -40px;
    padding: 10px;
    border-bottom: 1px solid ${mainBg};
  }
  &:hover {
    color: ${mainBg};
    background: ${mainLight};
    font-weight: 600;
  }
`;


const Header = () => {
  const [ menuOpen, setMenuOpen ] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  const closeMenu = () => {
    setMenuOpen(false)
  }
  return (
    <MainHeader>
      <Title> 
        <TitleLink to="/">Stocks and Currency API</TitleLink> 
      </Title>
      <MenuButton onClick={toggleMenu}>{menuOpen ? 'Close' : 'Menu'} <h4 className="menuIcon"><HiOutlineMenuAlt1 /></h4></MenuButton>
      <BlurDiv open={menuOpen} onClick={closeMenu}></BlurDiv>
      <Nav open={menuOpen}>
        <LinkWrapper>
          <SingleLink to="/journal" onClick={closeMenu}>
            <LinkList>Journal</LinkList>
          </SingleLink>
          <SingleLink to="/currencies" onClick={closeMenu}>
            <LinkList>Currencies</LinkList>
          </SingleLink>
          <SingleLink to="/History" onClick={closeMenu}>
            <LinkList>History</LinkList>
          </SingleLink>
          <SingleLink to="/correlation" onClick={closeMenu}>
            <LinkList>Correlation</LinkList>
          </SingleLink>
          <SingleLink to="/stock" onClick={closeMenu}>
            <LinkList>Stock</LinkList>
          </SingleLink>
        </LinkWrapper>
      </Nav>
    </MainHeader>
  )
}

export default Header;