import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Container = styled.div`
  font-family: Arial, sans-serif;
  background-color: #4CAF50;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
`;

const Title = styled.h2`
  text-align: center;
  color: #4CAF50;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.5rem 0.5rem 2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Icon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #4CAF50;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;  
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const BackButton = styled(Button)`
  background-color: #f44336;

  &:hover {
    background-color: #e53935;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const Legend = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: #4caf50;
  font-size: 1rem;
`;

const FormRegister = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    password: '',
    confirmPassword: '',
    telefono: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { nombres, apellidos, correo, password, confirmPassword, telefono } = formData;

    if (!/^[a-zA-Z\s]+$/.test(nombres)) {
      showError('El campo Nombres solo debe contener letras.');
      return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(apellidos)) {
      showError('El campo Apellidos solo debe contener letras.');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      showError('Por favor, ingrese un correo electrónico válido.');
      return false;
    }

    if (password.length < 8) {
      showError('La contraseña debe tener al menos 8 caracteres.');
      return false;
    }

    if (password !== confirmPassword) {
      showError('Las contraseñas no coinciden.');
      return false;
    }

    if (!/^\d{10}$/.test(telefono)) {
      showError('El teléfono debe contener exactamente 10 dígitos.');
      return false;
    }

    return true;
  };

  const showError = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userId = Math.floor(100000 + Math.random() * 900000);
      const rol = 'usuario';

      const userData = {
        userId,
        ...formData,
        rol,
      };

      console.log('Usuario registrado:', userData);

      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: `Tu ID de usuario es: ${userId}`,
      }).then(() => {
        setFormData({
          nombres: '',
          apellidos: '',
          correo: '',
          password: '',
          confirmPassword: '',
          telefono: '',
        });
      });
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Registro de Usuario</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="nombres">Nombres</Label>
            <InputGroup>
              <Icon icon={faUser} />
              <Input
                type="text"
                id="nombres"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="apellidos">Apellidos</Label>
            <InputGroup>
              <Icon icon={faUser} />
              <Input
                type="text"
                id="apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="correo">Correo electrónico</Label>
            <InputGroup>
              <Icon icon={faEnvelope} />
              <Input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Contraseña</Label>
            <InputGroup>
              <Icon icon={faLock} />
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <InputGroup>
              <Icon icon={faLock} />
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="telefono">Teléfono</Label>
            <InputGroup>
              <Icon icon={faPhone} />
              <Input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </FormGroup>
          <ButtonContainer>
            <BackButton type="button" onClick={() => navigate("/")} className='m-1'>Regresar</BackButton>
            <Button type="submit" className='m-1'>Registrarse</Button>
          </ButtonContainer>
        </form>
        <Legend as={Link} to="/login" className='' style={{textAlign:"center" , display:"block"}}>¿Ya tienes cuenta?</Legend>
      </FormContainer>
    </Container>
  );
};

export default FormRegister;
