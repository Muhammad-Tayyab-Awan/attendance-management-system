/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { NavBar } from "../components/Navbar";
import { useRoleContext } from "../context/roleContext";
import authApi from "../api/authApi";
import RegisterForm from "../components/RegisterForm";
import { Spinner } from "flowbite-react";

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
      {isLoading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-blue-950 text-white">
          <Spinner size="xl" />
        </div>
      )}
      <NavBar />
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
      <RegisterForm />
      </div>
    </>
  );
}

export default Register;
