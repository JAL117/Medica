import React, { useState } from 'react';
import styled from 'styled-components';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import axios from 'axios';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FaCalendarAlt, FaUser, FaClock, FaPhone } from 'react-icons/fa';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Container = styled.div`
  margin-top:5%;
  display: flex;
  flex-direction: column;
  padding: 5rem;
  margin: 100px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'Arial', sans-serif;
  height: 100hv;
  background-color: #f5f5f5;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
    
const FormSection = styled.div`
  flex: 1;
  margin-right: 2rem;
  margin-bottom: 2rem;
`;

const CalendarSection = styled.div`
  flex: 2;
`;

const Title = styled.h2`
  color: #4CAF50;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const Icon = styled.span`
  margin-right: 0.5rem;
`;

const StyledCalendar = styled(Calendar)`
  height: 500px;
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AppointmentView = () => {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    phone_number: '',
    last_name: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAppointment = {
      title: formData.name,
      start: new Date(`${formData.date}`),
      end: new Date(`${formData.date}`),
      phone: formData.phone_number,
    };
    setAppointments([...appointments, newAppointment]);

    const appointmentData = {
      cita: {
        doctorID: '1',
        fecha: formData.date,
        estado: 'Pendiente',
      },
      paciente: {
        names: formData.name,
        last_name: formData.last_name,
        password: '',
        email: formData.email,
        phone_number: formData.phone_number,
      },
    };

    try {
      const response = await axios.post('http://localhost:3000/api/medicalAppoinet/', {appointmentData});

      if (!response.ok) {
        throw new Error('Error al agendar cita', response);
      }

      const result = await response.json();
      console.log('Cita agendada:', result);
    } catch (error) {
      console.error('Error:', error);
    }

    setFormData({ name: '', date: '', time: '', phone_number: '', last_name: '', email: '' });
  };

  return (
    <Container>
      <FormSection>
        <Title>Agendar Cita</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">
              <Icon><FaUser /></Icon>Nombre
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="last_name">
              <Icon><FaUser /></Icon>Apellido
            </Label>
            <Input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">
              <Icon><FaUser /></Icon>Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="date">
              <Icon><FaCalendarAlt /></Icon>Fecha
            </Label>
            <Input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="phone_number">
              <Icon><FaPhone /></Icon>Teléfono
            </Label>
            <Input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <Button type="submit">Agendar Cita</Button>
        </Form>
      </FormSection>
      <CalendarSection>
        <Title>Calendario de Citas</Title>
        <StyledCalendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'day']}
          tooltipAccessor={(event) => `${event.title} - ${event.phone}`}
        />
      </CalendarSection>
    </Container>
  );
};

export default AppointmentView;
