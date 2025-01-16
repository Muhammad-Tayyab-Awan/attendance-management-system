import { Tabs } from "flowbite-react";
import { AttendanceProvider } from "../context/AttendanceContext";
import MarkAttendance from "./MarkAttendance";
import SubmitLeave from "./SubmitLeave";
import ViewAttendanceUser from "./ViewAttendanceUser";
import ViewLeaveUser from "./ViewLeaveUser";

function UserDashboard() {
  return (
    <>
      <AttendanceProvider>
        <Tabs aria-label="Default tabs" variant="default" className="w-[70vw]">
          <Tabs.Item title="Mark Attendance" active>
            <MarkAttendance />
          </Tabs.Item>
          <Tabs.Item title="Submit Leave">
            <SubmitLeave />
          </Tabs.Item>
          <Tabs.Item title="Attendance Record">
            <ViewAttendanceUser />
          </Tabs.Item>
          <Tabs.Item title="Leave Record">
            <ViewLeaveUser />
          </Tabs.Item>
        </Tabs>
      </AttendanceProvider>
    </>
  );
}

export default UserDashboard;
