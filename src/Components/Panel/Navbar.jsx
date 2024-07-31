import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Button,
  Container,
  Image,
  Offcanvas,
} from "react-bootstrap";
import {
  FaSignOutAlt,
  FaUser,
  FaCalendarPlus,
  FaCalendarAlt,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import img from "../../img/MedicaNatura(Logo).png";
import { FaUserNurse } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";
import { TbReport } from "react-icons/tb";
import { LuCalendarClock } from "react-icons/lu";
import { TbReportMedical } from "react-icons/tb";

const StyledNavbar = styled(Navbar)`
  background-color: #4caf50;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
    <div style={{ textDecoration: "none" }}>
      <StyledNavbar expand="lg" variant="dark" className="py-2">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="ms-3">
            <Image
              src={img}
              alt="Logo"
              height="80"
              className="d-inline-block align-top bg-white p-1"
              style={{ borderRadius: "25px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center ms=5"
          >
            <Nav className="align-items-center">
              <StyledButton as={Link} to="/panel">
                <RiDashboardFill size={30}/>Inicio
              </StyledButton>
              <StyledButton as={Link} to="/Panel/RegistroDeAsistente">
                <FaUserNurse size={30} /> Registrar asistente
              </StyledButton>
              <StyledButton as={Link} to="/Panel/AgendarCitas">
                <FaCalendarPlus size={30} /> Agendar cita
              </StyledButton>
              <StyledButton as={Link} to="/Panel/VerCitas">
                <FaCalendarAlt size={30} /> Ver citas
              </StyledButton>
              <StyledButton as={Link} to="/Panel/HistorialDeCitas">
                <LuCalendarClock size={30}/>Historial de Citas
              </StyledButton>
              <StyledButton as={Link} to="/Panel/ReporteClinico">
                 <TbReportMedical size={30}/> Reporte clinico
              </StyledButton>
        
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <StyledButton onClick={handleShow}>
              <FaUserDoctor size={30} />
            </StyledButton>
            <StyledButton as={Link} to="/">
              <FaSignOutAlt size={30} /> 
            </StyledButton>
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
    </div>
  );
};

export default NavbarComponent;
