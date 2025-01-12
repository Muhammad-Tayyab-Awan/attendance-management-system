import ViewAllAttendanceAdmin from "./ViewAllAttendanceAdmin";
import ViewAllGrades from "./ViewAllGrades";
import ViewAllLeavesAdmin from "./ViewAllLeavesAdmin";
import ViewAllUsers from "./ViewAllUsers";

function AdminDashboard() {
  return (
    <div>
      <ViewAllUsers />
      <ViewAllLeavesAdmin />
      <ViewAllAttendanceAdmin />
      <ViewAllGrades/>
    </div>
  );
}

export default AdminDashboard;
