import MarkAttendance from "./MarkAttendance";
import SubmitLeave from "./SubmitLeave";
import ViewAttendanceUser from "./ViewAttendanceUser";
import ViewLeaveUser from "./ViewLeaveUser";

function UserDashboard() {
  return (
    <div>
      <MarkAttendance />
      <SubmitLeave />
      <ViewAttendanceUser />
      <ViewLeaveUser />
    </div>
  );
}

export default UserDashboard;
