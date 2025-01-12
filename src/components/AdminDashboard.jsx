import ViewAllLeavesAdmin from "./ViewAllLeavesAdmin";
import ViewAllUsers from "./ViewAllUsers";

function AdminDashboard() {
  return (
    <div>
      <ViewAllUsers />
      <ViewAllLeavesAdmin />
    </div>
  );
}

export default AdminDashboard;
