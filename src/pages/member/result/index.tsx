import DashboardLayout from "@/components/layouts/DashboardLayout";
import Result from "@/components/views/Member/Result";

const DashboardMemberPage = () => {
  return (
    <DashboardLayout title="Result" description="Result member" type="member">
      <Result />
    </DashboardLayout>
  );
};

export default DashboardMemberPage;
