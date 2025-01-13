/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import attendanceApi from "../api/attendanceApi";
import { LeaveSubmitModal } from "./LeaveSubmitModal";
import SubmitTodayLeave from "./SubmitTodayLeave";
import { useAttendanceContext } from "../context/AttendanceContext";
const startHour = import.meta.env.VITE_START_HOUR;

function SubmitLeave() {
  const { marked, setStatus, setMarked } = useAttendanceContext();

  useEffect(() => {
    attendanceApi.getAttendance().then((response) => {
      if (response.success) {
        setMarked(true);
        setStatus(response.attendance.status);
      } else {
        setMarked(false);
      }
    });
  }, []);

  return (
    <div>
      {!marked && <SubmitTodayLeave />}
      <LeaveSubmitModal/>
    </div>
  );
}

export default SubmitLeave;
