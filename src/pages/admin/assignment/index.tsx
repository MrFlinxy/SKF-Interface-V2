import DashboardLayout from "@/components/layouts/DashboardLayout";
import Assignment from "@/components/views/Admin/Assignment";

const AdminAssignmentPage = () => {
  return (
    <DashboardLayout
      title="Assignment"
      description="Assignment admin"
      type="admin"
    >
      <Assignment />
    </DashboardLayout>
  );
};

export default AdminAssignmentPage;
