/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import attendanceApi from "../api/attendanceApi";
import { LeaveSubmitModal } from "./LeaveSubmitModal";
import SubmitTodayLeave from "./SubmitTodayLeave";
const startHour = import.meta.env.VITE_START_HOUR;

function SubmitLeave() {
  const [date, setDate] = useState(new Date());
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [attendanceMarked, setAttendanceMarked] = useState(
    date.getHours() >= startHour ? true : false,
  );

  useEffect(() => {
    attendanceApi.getAttendance().then((response) => {
      if (response.success) {
        setAttendanceMarked(true);
        setAttendanceStatus(response.attendance.status);
      } else {
        setAttendanceMarked(false);
      }
    });
  }, []);

  return (
    <div>
      <h1>Submit Leave</h1>
      {!attendanceMarked && <SubmitTodayLeave />}
      <LeaveSubmitModal attendanceMarked={attendanceMarked} />
    </div>
  );
}

export default SubmitLeave;
