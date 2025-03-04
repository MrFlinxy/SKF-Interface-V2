import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useRouter } from "next/router";
import ViewResultFile from "@/components/views/Admin/Result/ViewResultFile";

const ResultFile = () => {
  const router = useRouter();
  return (
    <div>
      <DashboardLayout
        title="Hasil Perhitungan"
        description="Hasil Perhitungan Admin"
        type="admin"
      >
        <ViewResultFile name={router.query.slug} />
      </DashboardLayout>
    </div>
  );
};
export default ResultFile;
