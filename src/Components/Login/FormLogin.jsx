import React, {useState} from "react";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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

const MySwal = withReactContent(Swal);

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/api/user/login/`, {
        email,
        password,
      });

      if (response) {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        navigate("/Panel");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        MySwal.fire(
          "Error de autenticación",
          "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
          "error"
        );
      } else {
        MySwal.fire(
          "Error",
          "Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo más tarde.",
          "error"
        );
      }
    }
  };


  const handleBack = () => {
    navigate("/");
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Header>
          <UserIcon />
        </Header>
        <Form onSubmit={handleLogin}>
          <InputContainer>
            <InputIcon>
              <MdEmail />
            </InputIcon>
            <Input 
            type="email" 
            placeholder="Correo electrónico" required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <InputIcon>
              <MdLock />
            </InputIcon>
            <Input type="password" 
            placeholder="Contraseña" required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button type="submit">Iniciar Sesión</Button>
          </div>
        </Form>
      </LoginBox>
    </LoginContainer>
  );
};

export default FormLogin;
