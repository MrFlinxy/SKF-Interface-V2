import DashboardLayout from "@/components/layouts/DashboardLayout";
import Queue from "@/components/views/Admin/Queue";

const AdminQueuePage = () => {
  return (
    <DashboardLayout
      title="Antrian Perhitungan"
      description="Antrian Perhitungan Admin"
      type="admin"
    >
      <Queue />
    </DashboardLayout>
  );
};

export default AdminQueuePage;
