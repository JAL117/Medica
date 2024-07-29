import React, { useState } from "react";
import { Navbar, Nav, Button, Container, Image, Offcanvas } from "react-bootstrap";
import { FaSignOutAlt, FaUser, FaCalendarPlus, FaCalendarAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import img from "../../img/MedicaNatura(Logo).png";

const StyledNavbar = styled(Navbar)`
  background-color: #4CAF50;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const StyledButton = styled(Button)`
  transition: all 0.3s ease;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 1rem;
  background-color: #45a049;
  border: none;
  color: white;
  margin-left: 10px;

  &:hover {
    background-color: #367c39;
  }
`;

const UserInfo = styled.div`
  padding: 20px;
`;

const NavbarComponent = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <>
      <StyledNavbar expand="lg" variant="dark" className="py-2">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="ms-3">
            <Image
              src={img}
              alt="Logo"
              height="80"
              className="d-inline-block align-top bg-white p-1"
              style={{borderRadius:"25px"}}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="me-3 align-items-center">
              <StyledButton as={Link} to="/Panel/AgendarCitas">
                <FaCalendarPlus /> Agendar cita
              </StyledButton>
              <StyledButton as={Link} to="/Panel/VerCitas">
                <FaCalendarAlt /> Ver citas 
              </StyledButton>
              <StyledButton onClick={handleShow}>
                <FaUser /> Usuario
              </StyledButton>
              <StyledButton as={Link} to="/">
                <FaSignOutAlt /> Salir
              </StyledButton>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>

      <Offcanvas show={showOffcanvas} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Información del Usuario</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <UserInfo>
            <h4>Nombre del Usuario</h4>
            <p>Email: usuario@example.com</p>
            <p>Rol: Secretaria</p>
        
          </UserInfo>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavbarComponent;