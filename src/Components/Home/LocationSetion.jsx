import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import img from "../../img/image.png"

const LocationSection = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-5">Encuéntranos</h2>
      <Row>
        <Col md={6}>
          <h3><FaMapMarkerAlt /> Dirección</h3>
          <p>Calle central sur Venustiano Carranza Chiapas</p>
          <h3><FaPhone /> Teléfono</h3>
          <p>961 132 6393</p>
        </Col>
        <Col md={6}>
          <img src={img} alt="Mapa de ubicación" className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
};

export default LocationSection;