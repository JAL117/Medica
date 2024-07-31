import React from 'react';
import { Container, Card, Carousel } from 'react-bootstrap';

const TestimonialsComponent = () => {
  const testimonials = [
    { name: 'María González', text: 'El Dr. Villatoro cambió mi vida con sus tratamientos naturales.' },
    { name: 'Juan Pérez', text: 'Excelente atención y resultados sorprendentes con la medicina natural.' },
    { name: 'Ana Martínez', text: 'Recomiendo ampliamente los servicios del Dr. Hernesto. ¡Gracias!' },
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center mb-5">Lo que dicen nuestros pacientes</h2>
      <Carousel>
        {testimonials.map((testimonial, index) => (
          <Carousel.Item key={index}>
            <Card className="text-center">
              <Card.Body>
                <Card.Text>"{testimonial.text}"</Card.Text>
                <Card.Title>{testimonial.name}</Card.Title>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default TestimonialsComponent;