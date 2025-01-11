import { useNavigate } from "react-router";
import { useEffect } from "react";
import { LoginForm } from "../components/LoginForm";
import { NavBar } from "../components/Navbar";
import { useRoleContext } from "../context/roleContext";
import authApi from "../api/authApi";

function Login() {
  const navigate = useNavigate();
  const { setStatus, setRole, status } = useRoleContext();
  useEffect(() => {
    authApi.verifyLogin().then(async (response) => {
      if (!response) {
        setStatus(response);
      } else {
        setStatus(response.status);
        setRole(response.role);
      }
    });
    if (status) {
      navigate("/dashboard");
    }
  });
  return (
    <>
      <NavBar />
      <LoginForm />
    </>
  );
}

export default Login;
