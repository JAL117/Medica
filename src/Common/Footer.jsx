import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '2rem 0',
    marginTop: 'auto',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    transition: 'opacity 0.3s',
  };

  const iconStyle = {
    fontSize: '1.5rem',
    marginRight: '1rem',
    transition: 'opacity 0.3s',
  };

  return (
    <footer style={footerStyle}>
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <h5>MedicaNatura</h5>
            <p>Cuidando tu salud naturalmente</p>
          </Col>
          <Col md={4} className="text-center mb-3 mb-md-0">
            {/* Esta columna está vacía como en tu ejemplo original */}
          </Col>
          <Col md={4} className="text-center text-md-end">
            <h5>Síguenos</h5>
            <a href="#" style={linkStyle}><FaFacebookF style={iconStyle} /></a>
            <a href="#" style={linkStyle}><FaTwitter style={iconStyle} /></a>
            <a href="#" style={linkStyle}><FaInstagram style={iconStyle} /></a>
            <a href="#" style={linkStyle}><FaLinkedinIn style={iconStyle} /></a>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">
            <p>&copy; 2024 MedicaNatura. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;