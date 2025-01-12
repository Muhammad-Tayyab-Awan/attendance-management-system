/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router";
import { NavBar } from "../components/Navbar";
import authApi from "../api/authApi";
import { useEffect } from "react";
import { useRoleContext } from "../context/roleContext";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";

function Dashboard() {
  const navigate = useNavigate();
  const { role, setStatus, setRole, status } = useRoleContext();
  useEffect(() => {
    authApi.verifyLogin().then(async (response) => {
      if (response.status) {
        setStatus(response.status);
        setRole(response.role);
      } else {
        setStatus(response);
        navigate("/");
      }
    });
  }, [status, role]);
  return (
    <>
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
