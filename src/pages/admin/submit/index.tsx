import DashboardLayout from "@/components/layouts/DashboardLayout";
import Submit from "@/components/views/Admin/Submit";

const AdminSubmitPage = () => {
  return (
    <DashboardLayout
      title="Kirim Perhitungan"
      description="Kirim Perhitungan Admin"
      type="admin"
    >
      <Submit />
    </DashboardLayout>
  );
};

export default AdminSubmitPage;
