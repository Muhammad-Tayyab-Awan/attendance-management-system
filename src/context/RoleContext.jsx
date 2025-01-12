/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import authApi from "../api/authApi";

const RoleContext = createContext({
  status: false,
  role: null,
  setStatus: () => {},
  setRole: () => {},
});

export const RoleProvider = ({ children }) => {
  const [status, setStatus] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    authApi.verifyLogin().then((res) => {
      if (res.status) {
        setStatus(true);
        setRole(res.role);
      } else {
        setStatus(res.status);
        setRole(null);
      }
    });
  }, []);

  return (
    <RoleContext.Provider value={{ status, role, setStatus, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRoleContext = () => {
  return useContext(RoleContext);
};

export default RoleContext;
