import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaTrash, FaUserPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Password } from '@mui/icons-material';

const Container = styled.div`
  max-width: 90%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin-top: 5%;
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const FormSection = styled.div`
  flex: 1;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const TableSection = styled.div`
  flex: 2;
`;

const Title = styled.h2`
  text-align: center;
  color: #4CAF50;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  padding-left: 35px;
`;

const Icon = styled.i`
  position: absolute;
  left: 10px;
  top: 12px;
  color: #4CAF50;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #45a049;
  }

  svg {
    margin-right: 8px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: #4CAF50;
  color: white;
  padding: 12px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #d32f2f;
  }

  svg {
    margin-right: 5px;
  }
`;

const RegistroAsistente = () => {
  const [formData, setFormData] = useState({
    names: '',
    last_name: '',
    phone_number: '',
    email: '',
    password: '',
    confirmarContrasena: '',
    rol: 2
  });
  const [asistentes, setAsistentes] = useState([]);

  useEffect(() => {
    fetchAsistentes();
  }, []);

  const fetchAsistentes = async () => {
    try {
      const response = await axios.get('http://api.example.com/asistentes');
      setAsistentes(response.data);
    } catch (error) {
      console.error('Error al obtener asistentes:', error);
      mostrarError('No se pudieron cargar los asistentes');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validarFormulario = () => {
    const { nombre, apellidos, telefono, email, contrasena, confirmarContrasena } = formData;

    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
      mostrarError('El nombre debe contener solo letras');
      return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(apellidos)) {
      mostrarError('Los apellidos deben contener solo letras');
      return false;
    }

    if (!/^\d{10}$/.test(telefono)) {
      mostrarError('El teléfono debe contener exactamente 10 dígitos');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      mostrarError('El email no es válido');
      return false;
    }

    if (contrasena.length < 8) {
      mostrarError('La contraseña debe tener al menos 8 caracteres');
      return false;
    }

    if (contrasena !== confirmarContrasena) {
      mostrarError('Las contraseñas no coinciden');
      return false;
    }

    return true;
  };

  const mostrarError = (mensaje) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      try {
        await axios.post('https://api.example.com/asistentes', formData);
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'El asistente ha sido registrado correctamente.',
        });
        fetchAsistentes();
        setFormData({
          nombre: '',
          apellidos: '',
          telefono: '',
          email: '',
          contrasena: '',
          confirmarContrasena: '',
          rol: 2
        });
      } catch (error) {
        console.error('Error al registrar asistente:', error);
        mostrarError('No se pudo registrar el asistente');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api.example.com/asistentes/${id}`);
      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'El asistente ha sido eliminado correctamente.',
      });
      fetchAsistentes();
    } catch (error) {
      console.error('Error al eliminar asistente:', error);
      mostrarError('No se pudo eliminar el asistente');
    }
  };

  return (
    <Container>
      <FormSection>
        <Title>Registro de Asistente</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="nombre">Nombre</Label>
            <InputWrapper>
              <Icon><FaUser /></Icon>
              <Input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </InputWrapper>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="apellidos">Apellidos</Label>
            <InputWrapper>
              <Icon><FaUser /></Icon>
              <Input
                type="text"
                id="apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                required
              />
            </InputWrapper>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="telefono">Teléfono</Label>
            <InputWrapper>
              <Icon><FaPhone /></Icon>
              <Input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </InputWrapper>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <InputWrapper>
              <Icon><FaEnvelope /></Icon>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </InputWrapper>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="contrasena">Contraseña</Label>
            <InputWrapper>
              <Icon><FaLock /></Icon>
              <Input
                type="password"
                id="contrasena"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                required
              />
            </InputWrapper>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirmarContrasena">Confirmar Contraseña</Label>
            <InputWrapper>
              <Icon><FaLock /></Icon>
              <Input
                type="password"
                id="confirmarContrasena"
                name="confirmarContrasena"
                value={formData.confirmarContrasena}
                onChange={handleChange}
                required
              />
            </InputWrapper>
          </FormGroup>
          <Button type="submit"><FaUserPlus /> Registrar Asistente</Button>
        </form>
      </FormSection>

      <TableSection>
        <Title>Asistentes Registrados</Title>
        <Table>
          <thead>
            <tr>
              <Th>Nombre</Th>
              <Th>Apellidos</Th>
              <Th>Teléfono</Th>
              <Th>Email</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {asistentes.map((asistente) => (
              <tr key={asistente.id}>
                <Td>{asistente.nombre}</Td>
                <Td>{asistente.apellidos}</Td>
                <Td>{asistente.telefono}</Td>
                <Td>{asistente.email}</Td>
                <Td>
                  <DeleteButton onClick={() => handleDelete(asistente.id)}>
                    <FaTrash /> Eliminar
                  </DeleteButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableSection>
    </Container>
  );
};

export default RegistroAsistente;
