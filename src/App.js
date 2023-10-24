import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { AuthContextProvider } from "./contexts/AuthContext";
import TodoList from "./components/TodoList";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { TodoContextProvider } from "./contexts/TodoContext"
import Edit from "./components/Edit";
import { EditContextProvider } from "./contexts/EditContext";
import NotFound from "./components/NotFound";
import ForgotPassword from "./components/ForgotPassword";
export let curYear = new Date().getFullYear();



export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <TodoContextProvider>
          <EditContextProvider>
            <Routes>
              <Route path='*' element={<NotFound />} />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/home" element={<ProtectedRoutes />} />
              <Route path="/todo-list" element={<TodoList />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
            </Routes>
          </EditContextProvider>
        </TodoContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
