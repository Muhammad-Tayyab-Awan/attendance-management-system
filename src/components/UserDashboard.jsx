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
            <MarkAttendance />
          </Tabs.Item>
          <Tabs.Item title="S L">
            <SubmitLeave />
          </Tabs.Item>
          <Tabs.Item title="A R">
            <ViewAttendanceUser />
          </Tabs.Item>
          <Tabs.Item title="L R">
            <ViewLeaveUser />
          </Tabs.Item>
        </Tabs>
      </AttendanceProvider>
    </>
  );
}

export default UserDashboard;
