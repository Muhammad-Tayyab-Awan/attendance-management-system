/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { NavBar } from "../components/Navbar";
import { useRoleContext } from "../context/roleContext";
import authApi from "../api/authApi";
import RegisterForm from "../components/RegisterForm";

function Register() {
  const navigate = useNavigate();
  const { setStatus, setRole, status } = useRoleContext();
  useEffect(() => {
    authApi.verifyLogin().then(async (response) => {
      if (!response) {
        setStatus(response);
      } else {
        setStatus(response.status);
        setRole(response.role);
        navigate("/dashboard");
      }
    });
  }, [status]);
  return (
    <>
      <NavBar />
      <RegisterForm />
    </>
  );
}

export default Register;
