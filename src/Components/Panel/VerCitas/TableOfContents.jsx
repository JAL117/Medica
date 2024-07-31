import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      title: 'Juan Perez',
      start: new Date('2024-07-29T10:00'),
      end: new Date('2024-07-29T11:00'),
      phone: '555-1234',
      status: 'Pendiente'
    },
    {
      id: 2,
      title: 'Maria Gomez',
      start: new Date('2024-07-30T14:00'),
      end: new Date('2024-07-30T15:00'),
      phone: '555-5678',
      status: 'Pendiente'
    },
    {
      id: 3,
      title: 'Carlos Sanchez',
      start: new Date('2024-07-31T09:00'),
      end: new Date('2024-07-31T10:00'),
      phone: '555-8765',
      status: 'Pendiente'
    },
  ]);

  const updateAppointmentStatus = () => {
    const now = new Date();
    const updatedAppointments = appointments.map(appointment => {
      if (appointment.start <= now && now < appointment.end) {
        return { ...appointment, status: 'En curso' };
      } else if (appointment.start > now) {
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
        <input id="name" class="swal2-input" placeholder="Nombre" value="${appointment.title}">
        <input id="date" type="date" class="swal2-input" value="${appointment.start.toISOString().substr(0, 10)}">
        <input id="time" type="time" class="swal2-input" value="${appointment.start.toTimeString().substr(0, 5)}">
        <input id="phone" type="tel" class="swal2-input" placeholder="Teléfono" value="${appointment.phone}">
        <select id="status" class="swal2-select">
          <option value="Pendiente" ${appointment.status === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
          <option value="En curso" ${appointment.status === 'En curso' ? 'selected' : ''}>En curso</option>
          <option value="Finalizada" ${appointment.status === 'Finalizada' ? 'selected' : ''}>Finalizada</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const name = Swal.getPopup().querySelector('#name').value;
        const date = Swal.getPopup().querySelector('#date').value;
        const time = Swal.getPopup().querySelector('#time').value;
        const phone = Swal.getPopup().querySelector('#phone').value;
        const status = Swal.getPopup().querySelector('#status').value;
        if (!name || !date || !time || !phone || !status) {
          Swal.showValidationMessage(`Por favor ingresa todos los datos`);
          return false;
        }
        return { name, date, time, phone, status };
      }
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
          a.id === appointment.id ? { ...a, status: 'Finalizada' } : a
        );
        setAppointments(updatedAppointments);
        // Aquí podrías enviar los datos a tu historial
        // sendToHistory(appointment);
        Swal.fire('Finalizada!', 'La cita ha sido marcada como finalizada y movida al historial.', 'success');
      }
    });
  };

  const handleView = (appointment) => {
    Swal.fire({
      title: `<strong>Detalles de la Cita</strong>`,
      html: `
        <p><b>Nombre:</b> ${appointment.title}</p>
        <p><b>Fecha:</b> ${appointment.start.toLocaleDateString()}</p>
        <p><b>Hora:</b> ${appointment.start.toLocaleTimeString()}</p>
        <p><b>Teléfono:</b> ${appointment.phone}</p>
        <p><b>Estado:</b> ${appointment.status}</p>
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
              <TableHeader>Estado</TableHeader>
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
                <TableCell>{appointment.status}</TableCell>
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