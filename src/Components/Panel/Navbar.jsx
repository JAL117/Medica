import React, { useState, useEffect } from "react";
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
  FaCalendarPlus,
  FaCalendarAlt,
  FaUserNurse
} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";
import { TbReportMedical } from "react-icons/tb";
import { LuCalendarClock } from "react-icons/lu";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import img from "../../img/MedicaNatura(Logo).png";

const StyledNavbar = styled(Navbar)`
  background-color: #4caf50;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled(Button)`
  transition: all 0.3s ease;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #45a049;
  border: none;
  color: white;
  margin: 5px;
  width: 180px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #367c39;
  }

  svg {
    margin-right: 8px;
  }
`;

const UserInfo = styled.div`
  padding: 20px;
`;

const NavbarComponent = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUserRole(userData.roleID);
  }, []);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  const isDoctor = userRole === 1;
  const isAssistant = userRole === 2;

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
            className="justify-content-center ms-5"
          >
            <Nav className="align-items-center">
              <StyledButton as={Link} to="/panel">
                <RiDashboardFill size={24}/>Inicio
              </StyledButton>
              <StyledButton as={Link} to="/Panel/AgendarCitas">
                <FaCalendarPlus size={24} /> Agendar cita
              </StyledButton>
              <StyledButton as={Link} to="/Panel/VerCitas">
                <FaCalendarAlt size={24} /> Ver citas
              </StyledButton>
              {isDoctor && (
                <>
                  <StyledButton as={Link} to="/Panel/RegistroDeAsistente">
                    <FaUserNurse size={24} /> Registrar asistente
                  </StyledButton>
                  <StyledButton as={Link} to="/Panel/HistorialDeCitas">
                    <LuCalendarClock size={24}/>Historial de Citas
                  </StyledButton>
                  <StyledButton as={Link} to="/Panel/ReporteClinico">
                    <TbReportMedical size={24}/> Reporte clínico
                  </StyledButton>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <StyledButton onClick={handleShow}>
              <FaUserDoctor size={24} />
            </StyledButton>
            <StyledButton as={Link} to="/">
              <FaSignOutAlt size={24} /> 
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
            <p>Rol: {isDoctor ? 'Doctor' : isAssistant ? 'Asistente' : 'No definido'}</p>
          </UserInfo>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default NavbarComponent;