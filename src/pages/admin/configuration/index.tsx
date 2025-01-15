import DashboardLayout from "@/components/layouts/DashboardLayout";
import Configuration from "@/components/views/Admin/Configuration";

const AdminConfigurationPage = () => {
  return (
    <DashboardLayout
      title="Configuration"
      description="Configuration admin"
      type="admin"
    >
      <Configuration />
    </DashboardLayout>
  );
};

export default AdminConfigurationPage;
