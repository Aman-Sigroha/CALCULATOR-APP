import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'tachyons';

function Navbar1(props) {
  const handleThemeChange = (selectedTheme) => {
    props.themedata(selectedTheme);
  };

  return (
    <Navbar expand="lg">
      <Container className='tc'>
        <Navbar.Brand href="#home" className=''>
          <h1 className="tc bg-light-green fw9 ba br4 bBlack" style={{ fontFamily: 'sans-serif' }}> CALCULATOR </h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="THEMES" id="basic-nav-dropdown" className='fw7' onSelect={handleThemeChange}>
              <NavDropdown.Item eventKey='color' key={1}>COLOR</NavDropdown.Item>
              <NavDropdown.Item eventKey='ball' key={2}>BALL</NavDropdown.Item>
              <NavDropdown.Item eventKey='fountain' key={3}>FOUNTAIN</NavDropdown.Item>
              <NavDropdown.Item eventKey='custom' key={4}>CUSTOM</NavDropdown.Item>
              <NavDropdown.Item eventKey='circle' key={5}>CIRCLE</NavDropdown.Item>
              <NavDropdown.Item eventKey='cobweb' key={6}>COBWEB</NavDropdown.Item>
              <NavDropdown.Item eventKey='polygon' key={7}>POLYGON</NavDropdown.Item>
              <NavDropdown.Item eventKey='square' key={7}>SQUARE</NavDropdown.Item>

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar1;
