/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router";
import { NavBar } from "../components/Navbar";
import authApi from "../api/authApi";
import { useEffect, useState } from "react";
import { useRoleContext } from "../context/RoleContext";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import Loader from "../utils/Loader";

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
      {isLoading && <Loader />}
      <NavBar />
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center gap-4 py-4">
        {role === "admin" ? (
          <AdminDashboard />
        ) : (
          role === "user" && <UserDashboard />
        )}
      </div>
    </>
  );
}

export default Dashboard;
