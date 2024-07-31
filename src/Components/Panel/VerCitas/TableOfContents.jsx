import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
  margin-top:0px;
`;

const TableContainer = styled.div`
  width: 100%;
  max-width: 80%;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
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

const AppointmentView = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/medicalAppoinet/')
      .then(response => {
        console.log(response);
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });
  }, []);

  const updateAppointmentStatus = () => {
    const now = new Date();
    const updatedAppointments = appointments.map(appointment => {
      const start = new Date(appointment.start);
      const end = new Date(appointment.end);
      if (start <= now && now < end) {
        return { ...appointment, status: 'En curso' };
      } else if (start > now) {
        return { ...appointment, status: 'Pendiente' };
      }
      return appointment;
    });
    setAppointments(updatedAppointments);
  };

  useEffect(() => {
    const intervalId = setInterval(updateAppointmentStatus, 60000); // Actualiza cada minuto
    return () => clearInterval(intervalId);
  }, [appointments]);

  const handleEdit = (appointment) => {
    Swal.fire({
      title: 'Editar Cita',
      html: `
        <input id="name" class="swal2-input" placeholder="Nombre" value="${appointment.names}">
        <input id="date" type="date" class="swal2-input" value="${appointment.fecha}">
        <input id="phone" type="tel" class="swal2-input" placeholder="Teléfono" value="${appointment.phone_number}">
        <select id="status" class="swal2-select">
          <option value="Pendiente" ${appointment.estado === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
          <option value="En curso" ${appointment.estado === 'En curso' ? 'selected' : ''}>En curso</option>
          <option value="Finalizada" ${appointment.estado === 'Finalizada' ? 'selected' : ''}>Finalizada</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const { name, date, time, phone, status } = result.value;
        const updatedAppointments = appointments.map(a =>
          a.id === appointment.id ? { ...a, title: name, start: new Date(`${date}T${time}`), end: new Date(`${date}T${time}`), phone, status } : a
        );
        setAppointments(updatedAppointments);
        Swal.fire('Guardado', 'La cita ha sido actualizada', 'success');
      }
    });
  };

  const handleDelete = (appointment) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto marcará la cita como finalizada y la moverá al historial.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, finalizar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedAppointments = appointments.map(a => 
          a.id === appointment.id ? { ...a, estado: 'Finalizada' } : a
        );
        setAppointments(updatedAppointments);
        Swal.fire('Finalizada!', 'La cita ha sido marcada como finalizada y movida al historial.', 'success');
      }
    });
  };

  const handleView = (appointment) => {
    Swal.fire({
      title: `<strong>Detalles de la Cita</strong>`,
      html: `
        <p><b>Nombre:</b> ${appointment.names}</p>
        <p><b>Fecha:</b> ${new Date(appointment.fecha).toLocaleDateString()}</p>
        <p><b>Teléfono:</b> ${appointment.phone_number}</p>
        <p><b>Estado:</b> ${appointment.estado}</p>
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
              <TableHeader>Teléfono</TableHeader>
              <TableHeader>Estado</TableHeader>
              <TableHeader>Acciones</TableHeader>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <TableRow key={appointment.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{appointment.names}</TableCell>
                <TableCell>{new Date(appointment.fecha).toLocaleDateString()}</TableCell>
                <TableCell>{appointment.phone_number}</TableCell>
                <TableCell>{appointment.estado}</TableCell>
                <TableCell>
                  <Button bgColor="#FFD700" hoverColor="#FFC107" onClick={() => handleView(appointment)}>
                    <FaEye /> Ver
                  </Button>
                  <Button bgColor="#4CAF50" hoverColor="#45a049" onClick={() => handleEdit(appointment)}>
                    <FaEdit /> Editar
                  </Button>
                  <Button bgColor="#f44336" hoverColor="#e53935" onClick={() => handleDelete(appointment)}>
                    <FaTrash /> Finalizar
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

export default AppointmentView;
