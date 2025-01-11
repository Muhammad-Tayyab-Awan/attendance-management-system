/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router";
import { NavBar } from "../components/Navbar";
import authApi from "../api/authApi";
import { useEffect } from "react";
import { useRoleContext } from "../context/roleContext";
import { Button } from "flowbite-react";
import toast from "react-hot-toast";

function Logout() {
  const navigate = useNavigate();
  const { setStatus, setRole, status } = useRoleContext();
  useEffect(() => {
    authApi.verifyLogin().then(async (response) => {
      if (!response) {
        setStatus(response);
        navigate("/");
      } else {
        setStatus(response.status);
        setRole(response.role);
      }
    });
  }, [status]);

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
      <NavBar />
      Are you confirm to logout?
      <Button size="sm" onClick={handleSubmit}>
        Logout
      </Button>
    </>
  );
}

export default Logout;
