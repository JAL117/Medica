import React from "react";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #4caf50;
`;

const LoginBox = styled.div`
  background: #ffffff;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const UserIcon = styled(FaUserCircle)`
  font-size: 4rem;
  color: #4caf50;
  margin-right: 1rem;
`;

const Logo = styled.div`
  img {
    max-width: 100px;
  }
`;

const Form = styled.form`
  text-align: left;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const InputIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #ccc;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
  &:hover {
    background-color: #45a049;
  }
`;

const BackButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #ccc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
  &:hover {
    background-color: #b3b3b3;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const LinkC = styled.a`
  color: #4caf50;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const FormLogin = () => {
  const navigate = useNavigate(); 

  const handleBack = () => {
    navigate("/");
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Header>
          <UserIcon />
        </Header>
        <Form>
          <InputContainer>
            <InputIcon>
              <MdEmail />
            </InputIcon>
            <Input type="email" placeholder="Correo electrónico" required />
          </InputContainer>
          <InputContainer>
            <InputIcon>
              <MdLock />
            </InputIcon>
            <Input type="password" placeholder="Contraseña" required />
          </InputContainer>
          <div style={{ display: "flex", gap: "10px" }}>
            <BackButton type="button" onClick={handleBack}>
              Volver Atrás
            </BackButton>
            <Button type="submit" as={Link} to="/Panel/Principal">Iniciar Sesión</Button>
          </div>
        </Form>
        <LinkContainer>
          <LinkC >¿Olvidaste tu contraseña?</LinkC>
          <LinkC as={Link} to="/Register">¿No tienes una cuenta?</LinkC>
        </LinkContainer>
      </LoginBox>
    </LoginContainer>
  );
};

export default FormLogin;
