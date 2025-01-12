import ViewAllAttendanceAdmin from "./ViewAllAttendanceAdmin";
import ViewAllLeavesAdmin from "./ViewAllLeavesAdmin";
import ViewAllUsers from "./ViewAllUsers";

function AdminDashboard() {
  return (
    <div>
      <ViewAllUsers />
      <ViewAllLeavesAdmin />
      <ViewAllAttendanceAdmin/>
    </div>
  );
}

export default AdminDashboard;
