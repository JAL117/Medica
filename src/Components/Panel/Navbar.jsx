import React from "react";
import { Navbar, Nav, Button, Container, Image } from "react-bootstrap";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import img from "../../img/MedicaNatura(Logo).png"
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const navbarStyle = {
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  };

  const buttonStyle = {
    transition: "all 0.3s ease",
    borderRadius: "20px",
    padding: "8px 16px",
    fontSize: "1rem",
    backgroundColor:"acaf50"
  };

  return (
    <Navbar expand="lg" style={navbarStyle} className="py-2">
      <Container fluid>
        <Navbar.Brand href="#home" className="ms-3">
          <Image
            src={img}
            alt="Logo"
            height="60"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-3">
            <Button style={buttonStyle}>
                Agendar cita
            </Button>
            <Button style={buttonStyle}>
                Ver citas 
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;