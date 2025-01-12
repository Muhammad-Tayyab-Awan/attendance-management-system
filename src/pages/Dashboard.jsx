/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router";
import { NavBar } from "../components/Navbar";
import authApi from "../api/authApi";
import { useEffect, useState } from "react";
import { useRoleContext } from "../context/roleContext";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import { Spinner } from "flowbite-react";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { role, setStatus, setRole } = useRoleContext();
  useEffect(() => {
    authApi.verifyLogin().then(async (response) => {
      if (response.status) {
        setStatus(response.status);
        setRole(response.role);
        setIsLoading(false);
      } else {
        setStatus(response);
        navigate("/");
      }
    });
  }, []);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/75 text-white">
          <Spinner size="xl" />
        </div>
      )}
      <NavBar />
      {role === "admin" ? (
        <AdminDashboard />
      ) : (
        role === "user" && <UserDashboard />
      )}
    </>
  );
}

export default Dashboard;
