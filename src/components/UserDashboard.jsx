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
        <Tabs
          aria-label="Default tabs"
          variant="fullWidth"
          className="mx-auto w-[95%] max-w-lg rounded-lg"
        >
          <Tabs.Item title="M A" active>
            <p className="mb-3 text-center text-lg font-semibold">
              Mark Attendance
            </p>
            <MarkAttendance />
          </Tabs.Item>
          <Tabs.Item title="S L">
            <p className="mb-3 text-center text-lg font-semibold">
              Submit Leave
            </p>
            <SubmitLeave />
          </Tabs.Item>
          <Tabs.Item title="A R">
            <p className="mb-3 text-center text-lg font-semibold">
              View Attendance
            </p>
            <ViewAttendanceUser />
          </Tabs.Item>
          <Tabs.Item title="L R">
            <p className="mb-3 text-center text-lg font-semibold">View Leave</p>
            <ViewLeaveUser />
          </Tabs.Item>
        </Tabs>
      </AttendanceProvider>
    </>
  );
}

export default UserDashboard;
