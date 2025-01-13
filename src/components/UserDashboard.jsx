import { AttendanceProvider } from "../context/AttendanceContext";
import MarkAttendance from "./MarkAttendance";
import SubmitLeave from "./SubmitLeave";
import ViewAttendanceUser from "./ViewAttendanceUser";
import ViewLeaveUser from "./ViewLeaveUser";

function UserDashboard() {
  return (
    <div>
      <AttendanceProvider>
        <MarkAttendance />
        <SubmitLeave />
        <ViewAttendanceUser />
        <ViewLeaveUser />
      </AttendanceProvider>
    </div>
  );
}

export default UserDashboard;
