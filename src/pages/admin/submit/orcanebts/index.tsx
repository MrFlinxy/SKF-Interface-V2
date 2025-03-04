import DashboardLayout from "@/components/layouts/DashboardLayout";
import OrcaNEBTS from "@/components/views/Admin/Submit/OrcaNEBTS";

const AdminSubmitOrcaNEBTSPage = () => {
  return (
    <DashboardLayout
      title="Kirim Perhitungan | Orca NEB-TS"
      description="Kirim Perhitungan Admin"
      type="admin"
    >
      <OrcaNEBTS />
    </DashboardLayout>
  );
};

export default AdminSubmitOrcaNEBTSPage;
