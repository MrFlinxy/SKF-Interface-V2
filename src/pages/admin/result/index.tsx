import DashboardLayout from "@/components/layouts/DashboardLayout";
import Result from "@/components/views/Admin/Result";

const AdminResultPage = () => {
  return (
    <DashboardLayout
      title="Hasil Perhitungan"
      description="Hasil Perhitungan Admin"
      type="admin"
    >
      <Result />
    </DashboardLayout>
  );
};

export default AdminResultPage;
