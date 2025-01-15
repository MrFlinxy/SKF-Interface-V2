import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashboard";

const AdminDashboardPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Dashboard admin"
      type="admin"
    >
      <Dashboard />
    </DashboardLayout>
  );
};

export default AdminDashboardPage;
