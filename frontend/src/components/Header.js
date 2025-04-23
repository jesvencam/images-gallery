import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { ReactComponent as Logo } from '../images/logo.svg';

const navbarStyle = {
  backgroundColor: 'lightblue',
};

const Header = ({ title }) => {
  return (
    <Navbar style={navbarStyle} variant="light">
      <Container>
        <Logo
          alt={title}
          style={{ maxWidth: '12rem', maxHeight: '4rem' }}
        ></Logo>
        {/* <Navbar.Brand href="/">{title}</Navbar.Brand> */}
      </Container>
    </Navbar>
  );
};

export default Header;
