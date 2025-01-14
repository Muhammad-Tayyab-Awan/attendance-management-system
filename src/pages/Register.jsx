/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { NavBar } from "../components/Navbar";
import { useRoleContext } from "../context/RoleContext";
import authApi from "../api/authApi";
import RegisterForm from "../components/RegisterForm";
import Loader from "../utils/Loader";

function Register() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { setStatus, setRole } = useRoleContext();
  useEffect(() => {
    authApi.verifyLogin().then(async (response) => {
      if (!response) {
        setStatus(response);
        setIsLoading(false);
      } else {
        setStatus(response.status);
        setRole(response.role);
        navigate("/dashboard");
      }
    });
  }, []);
  return (
    <>
      {isLoading && <Loader />}
      <NavBar />
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
        <RegisterForm />
      </div>
    </>
  );
}

export default Register;
