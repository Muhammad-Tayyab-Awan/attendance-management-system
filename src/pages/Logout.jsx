/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router";
import { NavBar } from "../components/Navbar";
import authApi from "../api/authApi";
import { useEffect, useState } from "react";
import { useRoleContext } from "../context/RoleContext";
import { Button } from "flowbite-react";
import toast from "react-hot-toast";
import Loader from "../utils/Loader";

function Logout() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { setStatus, setRole } = useRoleContext();
  useEffect(() => {
    authApi.verifyLogin().then(async (response) => {
      if (!response) {
        setStatus(response);
        navigate("/");
      } else {
        setStatus(response.status);
        setRole(response.role);
        setIsLoading(false);
      }
    });
  }, []);

  const handleSubmit = async () => {
    authApi.logout().then((response) => {
      if (response.success) {
        toast.success(response.msg);
        navigate("/");
        setRole(null);
        setStatus(false);
      } else {
        toast.error(response.error);
        navigate("/");
      }
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      <NavBar />
      Are you confirm to logout?
      <Button size="sm" onClick={handleSubmit}>
        Logout
      </Button>
    </>
  );
}

export default Logout;
