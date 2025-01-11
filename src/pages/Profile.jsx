import { useNavigate } from "react-router";
import { NavBar } from "../components/Navbar";
import authApi from "../api/authApi";
import { useEffect } from "react";
import { useRoleContext } from "../context/roleContext";

function Profile() {
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
    if (!status) {
      navigate("/");
    }
  });

  return (
    <>
      <NavBar />
    </>
  );
}

export default Profile;
