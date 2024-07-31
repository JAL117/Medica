import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';

const HeroSection = styled.div`
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const HeroContent = styled.div`
  color: white;
  text-align: center;
`;

const HeroComponent = () => {
  return (
    <HeroSection>
      <Container>
        <Row>
          <Col md={12}>
            <HeroContent>
              <h1>Medicina Natural con el Dr. Hernesto Alonso Villatoro</h1>
              <p>Consultorio médico y venta de medicamentos naturales</p>
              <Button variant="success" size="lg">Agenda tu consulta</Button>
            </HeroContent>
          </Col>
        </Row>
      </Container>
    </HeroSection>
  );
};

export default HeroComponent;