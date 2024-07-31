import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaLeaf, FaClinicMedical, FaPills } from 'react-icons/fa';

const ServicesComponent = () => {
  const services = [
    { icon: <FaLeaf />, title: 'Medicina Natural', description: 'Tratamientos basados en la naturaleza para tu bienestar.' },
    { icon: <FaClinicMedical />, title: 'Consultas Médicas', description: 'Atención personalizada por el Dr. Hernesto Alonso Villatoro.' },
    { icon: <FaPills />, title: 'Medicamentos Naturales', description: 'Venta de productos naturales de alta calidad.' },
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center mb-5">Nuestros Servicios</h2>
      <Row>
        {services.map((service, index) => (
          <Col md={4} key={index}>
            <Card className="text-center mb-4">
              <Card.Body>
                <div className="display-4 text-success mb-3">{service.icon}</div>
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ServicesComponent;