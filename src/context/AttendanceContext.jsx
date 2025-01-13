/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import attendanceApi from "../api/attendanceApi";

const AttendanceContext = createContext({
  status: false,
  marked: null,
  setStatus: () => {},
  setMarked: () => {},
});

export const AttendanceProvider = ({ children }) => {
  const [status, setStatus] = useState(false);
  const [marked, setMarked] = useState(null);

  useEffect(() => {
    attendanceApi.getAttendance().then((res) => {
      if (res.success) {
          setMarked(true);
        setStatus(res.attendance.status);
      } else {
          setMarked(false);
        setStatus(null);
      }
    });
  }, []);

  return (
    <AttendanceContext.Provider value={{ status, marked, setStatus, setMarked }}>
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendanceContext = () => {
  return useContext(AttendanceContext);
};

export default AttendanceContext;
