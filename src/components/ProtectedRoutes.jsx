import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import Login from "./Login";

export const ProtectedRoutes = () => {
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    loggedUser ? navigate('/todo-list') : <Login />
  );
}
