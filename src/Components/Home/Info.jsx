import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { FaBuilding, FaUsers, FaChartLine, FaAward } from 'react-icons/fa';

const Container = styled.div`

  padding: 2rem;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  color: #4CAF50;
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  margin-top:1rem;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const Card = styled(animated.div)`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  color: #4CAF50;
  margin-bottom: 1rem;
  text-align: center;
`;

const CardTitle = styled.h2`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const CardContent = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
`;

const Info = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 },
  });

  const cardData = [
    {
      icon: <FaBuilding />,
      title: 'Nuestra Empresa',
      content: 'Fundada en 2010, somos líderes en soluciones innovadoras para empresas de todos los tamaños.',
    },
    {
      icon: <FaUsers />,
      title: 'Nuestro Equipo',
      content: 'Contamos con más de 200 profesionales altamente calificados y comprometidos con la excelencia.',
    },
    {
      icon: <FaChartLine />,
      title: 'Crecimiento',
      content: 'Hemos experimentado un crecimiento anual del 30% en los últimos 5 años, expandiendo nuestra presencia global.',
    },
    {
      icon: <FaAward />,
      title: 'Reconocimientos',
      content: 'Galardonados con el premio a la Innovación Empresarial en 2022 y 2023.',
    },
  ];

  return (
    <Container>
      <Title>Acerca de Nuestra Empresa</Title>
      <CardContainer>
        {cardData.map((card, index) => (
          <Card key={index} style={fadeIn}>
            <CardIcon>{card.icon}</CardIcon>
            <CardTitle>{card.title}</CardTitle>
            <CardContent>{card.content}</CardContent>
          </Card>
        ))}
      </CardContainer>
    </Container>
  );
};

export default Info;