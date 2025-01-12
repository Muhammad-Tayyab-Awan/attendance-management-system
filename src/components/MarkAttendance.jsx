import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import attendanceApi from "../api/attendanceApi";
import toast from "react-hot-toast";
const startHour = import.meta.env.VITE_START_HOUR;

function MarkAttendance() {
  const [date, setDate] = useState(new Date());
  const [attendanceMarked, setAttendanceMarked] = useState(
    date.getHours() >= startHour ? true : false,
  );

  const [attendanceStatus, setAttendanceStatus] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [date]);

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

  const markAttendance = async () => {
    const response = await attendanceApi.markAttendance();
    if (response.success) {
      setAttendanceMarked(true);
      setAttendanceStatus("present");
    } else {
      toast.error(response.error);
    }
  };

  return (
    <div>
      <h1>Mark Today Attendance</h1>
      <p>
        {attendanceMarked
          ? attendanceStatus === "absent"
            ? "You are absent today"
            : attendanceStatus === "leave"
              ? "You are on leave today"
              : `You are ${attendanceStatus} today`
          : `Attendance is not marked yet. please mark your attendance before ${startHour} o'clock`}
      </p>
      <div>Date : {date.toDateString()}</div>
      <div>Time : {date.toTimeString().split(" ")[0]}</div>
      <Button
        color={attendanceMarked ? "failure" : "success"}
        disabled={attendanceMarked}
        onClick={markAttendance}
      >
        Mark Now
      </Button>
    </div>
  );
}

export default MarkAttendance;
