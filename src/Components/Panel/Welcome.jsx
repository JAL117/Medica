import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaUser, FaCalendarCheck, FaClock, FaChartLine, FaPhone } from 'react-icons/fa';
import axios from 'axios'; // Asegúrate de instalar axios: npm install axios

const Container = styled.div`
  background-color: #f5f5f5;
  padding: 3rem;
  font-family: 'Arial', sans-serif;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 90%;
  margin: 5%;
`;

const Header = styled.h1`
  color: #4CAF50;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
`;

const UserIcon = styled(FaUser)`
  margin-right: 1rem;
  font-size: 2rem;
`;

const StatContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const StatCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  color: #4CAF50;
  margin-bottom: 1rem;
`;

const StatTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const StatValue = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4CAF50;
`;

const AppointmentList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 1rem;
`;

const AppointmentItem = styled.li`
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }
`;

const AppointmentDate = styled.div`
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 0.5rem;
`;

const AppointmentDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AppointmentInfo = styled.div`
  display: flex;
  align-items: center;
`;

const AppointmentIcon = styled.span`
  margin-right: 0.5rem;
  color: #666;
`;

const AppointmentText = styled.span`
  color: #333;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #666;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: #f44336;
`;

const WelcomeComponent = ({ userName }) => {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    upcomingAppointments: 0,
    occupancyRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        // Simula datos de citas
        const simulatedData = [
          { date: '2024-08-01', time: '10:00', name: 'John Doe', phone: '123-456-7890' },
          { date: '2024-08-02', time: '11:00', name: 'Jane Smith', phone: '123-456-7891' },
          { date: '2024-08-03', time: '09:30', name: 'Alice Johnson', phone: '123-456-7892' },
          { date: '2024-08-04', time: '14:00', name: 'Bob Brown', phone: '123-456-7893' },
          { date: '2024-08-05', time: '16:00', name: 'Carol White', phone: '123-456-7894' },
          // Más datos simulados si es necesario
        ];
        setAppointments(simulatedData);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las citas. Por favor, intente más tarde.');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    if (appointments.length > 0) {
      const now = new Date();
      const total = appointments.length;
      const upcoming = appointments.filter(apt => new Date(apt.date) > now).length;
      const occupancy = total > 0 ? (upcoming / total) * 100 : 0;

      setStats({
        totalAppointments: total,
        upcomingAppointments: upcoming,
        occupancyRate: occupancy.toFixed(2),
      });
    }
  }, [appointments]);

  const nextFiveAppointments = appointments
    .filter(apt => new Date(apt.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  if (loading) {
    return <LoadingMessage>Cargando datos...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <Header>
        <UserIcon />
        Bienvenido, {userName}
      </Header>
      <p>Aquí tienes un resumen del estado actual del consultorio:</p>
      
      <StatContainer>
        <StatCard>
          <StatIcon><FaCalendarCheck /></StatIcon>
          <StatTitle>Citas Totales</StatTitle>
          <StatValue>{stats.totalAppointments}</StatValue>
        </StatCard>
        <StatCard>
          <StatIcon><FaClock /></StatIcon>
          <StatTitle>Citas Próximas</StatTitle>
          <StatValue>{stats.upcomingAppointments}</StatValue>
        </StatCard>
      </StatContainer>

      <h2 style={{ marginTop: '2rem', color: '#4CAF50' }}>Próximas 5 Citas:</h2>
      {nextFiveAppointments.length > 0 ? (
        <AppointmentList>
          {nextFiveAppointments.map((apt, index) => (
            <AppointmentItem key={index}>
              <AppointmentDate>
                {new Date(apt.date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </AppointmentDate>
              <AppointmentDetails>
                <AppointmentInfo>
                  <AppointmentIcon><FaClock /></AppointmentIcon>
                  <AppointmentText>{apt.time}</AppointmentText>
                </AppointmentInfo>
                <AppointmentInfo>
                  <AppointmentIcon><FaUser /></AppointmentIcon>
                  <AppointmentText>{apt.name}</AppointmentText>
                </AppointmentInfo>
                <AppointmentInfo>
                  <AppointmentIcon><FaPhone /></AppointmentIcon>
                  <AppointmentText>{apt.phone}</AppointmentText>
                </AppointmentInfo>
              </AppointmentDetails>
            </AppointmentItem>
          ))}
        </AppointmentList>
      ) : (
        <p>No hay citas próximas programadas.</p>
      )}
    </Container>
  );
};

export default WelcomeComponent;