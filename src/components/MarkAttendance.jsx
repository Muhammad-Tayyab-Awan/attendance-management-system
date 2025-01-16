/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import attendanceApi from "../api/attendanceApi";
import toast from "react-hot-toast";
import { useAttendanceContext } from "../context/AttendanceContext";
const startHour = import.meta.env.VITE_START_HOUR;

function MarkAttendance() {
  const [processing, setProcessing] = useState(false);
  const [date, setDate] = useState(new Date());

  const { marked, status, setMarked, setStatus } = useAttendanceContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const markAttendance = async () => {
    const response = await attendanceApi.markAttendance();
    if (response.success) {
      toast.success(response.msg);
      setStatus("present");
      setMarked(true);
      setProcessing(false);
    } else {
      toast.error(response.error);
      setProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-4 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <h1 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
        Mark Today Attendance
      </h1>
      <p className="text-gray-700 dark:text-gray-300">
        {marked
          ? status === "absent"
            ? "You are absent today"
            : status === "leave"
              ? "You are on leave today"
              : `You are ${status} today`
          : date.getHours() >= startHour - 1 && date.getHours() <= 7
            ? `Attendance is not marked yet. Please mark your attendance before ${startHour} o'clock`
            : `You can only mark your attendance from ${startHour - 1} o'clock to ${startHour} o'clock`}
      </p>
      <div className="text-gray-700 dark:text-gray-300">
        <p>
          <span className="font-medium">Date:</span> {date.toDateString()}
        </p>
        <p>
          <span className="font-medium">Time:</span>{" "}
          {date.toTimeString().split(" ")[0]}
        </p>
      </div>
      <Button
        disabled={
          status ||
          date.getHours() > startHour ||
          date.getHours() < startHour - 1
        }
        onClick={(e) => {
          e.preventDefault();
          markAttendance();
          setProcessing(true);
        }}
        isProcessing={processing}
        type="submit"
        color={marked ? "failure" : "success"}
      >
        {marked ? "Already Marked" : "Mark Now"}
      </Button>
    </div>
  );
}

export default MarkAttendance;
