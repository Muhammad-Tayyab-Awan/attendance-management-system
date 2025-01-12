import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import attendanceApi from "../api/attendanceApi";
import toast from "react-hot-toast";
const startHour = import.meta.env.VITE_START_HOUR;

function MarkAttendance() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(date.toTimeString().split(" ")[0]);
  const [attendanceMarked, setAttendanceMarked] = useState(
    date.getHours() >= startHour ? true : false,
  );

  const [attendanceStatus, setAttendanceStatus] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    setTime(date.toTimeString().split(" ")[0]);
    return () => clearInterval(interval);
  }, [time, date]);

  useEffect(() => {
    attendanceApi.getAttendance().then((response) => {
      if (response.success) {
        setAttendanceMarked(true);
        setAttendanceStatus(response.attendance.status);
      } else {
        setAttendanceMarked(false);
      }
    });
  }, [date]);

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
      <div>Time : {time}</div>
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
