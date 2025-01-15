import DashboardLayout from "@/components/layouts/DashboardLayout";
import Orca from "@/components/views/Admin/Submit/Orca";

const AdminSubmitOrcaPage = () => {
  return (
    <DashboardLayout
      title="Kirim Perhitungan | Orca"
      description="Kirim Perhitungan Admin"
      type="admin"
    >
      <Orca />
    </DashboardLayout>
  );
};

export default AdminSubmitOrcaPage;
