/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

const RoleContext = createContext({
  status: false,
  role: null,
  setStatus: () => {},
  setRole: () => {},
});

export const RoleProvider = ({ children }) => {
  const [status, setStatus] = useState(false);
  const [role, setRole] = useState(null);

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
