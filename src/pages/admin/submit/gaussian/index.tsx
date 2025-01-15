import DashboardLayout from "@/components/layouts/DashboardLayout";
import Gaussian from "@/components/views/Admin/Submit/Gaussian";

const AdminSubmitGaussianPage = () => {
  return (
    <DashboardLayout
      title="Kirim Perhitungan | Gaussian"
      description="Kirim Perhitungan Admin"
      type="admin"
    >
      <Gaussian />
    </DashboardLayout>
  );
};

export default AdminSubmitGaussianPage;
