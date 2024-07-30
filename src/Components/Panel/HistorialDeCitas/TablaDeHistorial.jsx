import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
  margin-top: 0px;
`;

const TableContainer = styled.div`
  width: 100%;
  max-width: 80%;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #4CAF50;
  color: white;
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: #ddd;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const Button = styled.button`
  background-color: ${(props) => props.bgColor || '#4CAF50'};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;

  &:hover {
    background-color: ${(props) => props.hoverColor || '#45a049'};
  }
`;

const Title = styled.h2`
  color: #4CAF50;
  margin-bottom: 1rem;
`;

const TablaDeHistorial = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      title: 'Juan Perez',
      start: new Date('2024-07-29T10:00'),
      end: new Date('2024-07-29T11:00'),
      phone: '555-1234',
    },
    {
      id: 2,
      title: 'Maria Gomez',
      start: new Date('2024-07-30T14:00'),
      end: new Date('2024-07-30T15:00'),
      phone: '555-5678',
    },
    {
      id: 3,
      title: 'Carlos Sanchez',
      start: new Date('2024-07-31T09:00'),
      end: new Date('2024-07-31T10:00'),
      phone: '555-8765',
    },
  ]);

  const handleView = (appointment) => {
    Swal.fire({
      title: `<strong>Detalles de la Cita</strong>`,
      html: `
        <p><b>Nombre:</b> ${appointment.title}</p>
        <p><b>Fecha:</b> ${appointment.start.toLocaleDateString()}</p>
        <p><b>Hora:</b> ${appointment.start.toLocaleTimeString()}</p>
        <p><b>Teléfono:</b> ${appointment.phone}</p>
      `,
      confirmButtonText: 'Cerrar'
    });
  };

  return (
    <Container>
      <TableContainer>
        <Title>Lista de Citas</Title>
        <Table>
          <thead>
            <tr>
              <TableHeader>Numero de cita</TableHeader>
              <TableHeader>Nombre</TableHeader>
              <TableHeader>Fecha</TableHeader>
              <TableHeader>Hora</TableHeader>
              <TableHeader>Teléfono</TableHeader>
              <TableHeader>Acciones</TableHeader>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <TableRow key={appointment.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{appointment.title}</TableCell>
                <TableCell>{appointment.start.toLocaleDateString()}</TableCell>
                <TableCell>{appointment.start.toLocaleTimeString()}</TableCell>
                <TableCell>{appointment.phone}</TableCell>
                <TableCell>
                  <Button bgColor="#FFD700" hoverColor="#FFC107" onClick={() => handleView(appointment)}>
                    <FaEye /> Ver
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TablaDeHistorial;
