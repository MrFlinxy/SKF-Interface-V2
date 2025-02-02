import DashboardLayout from "@/components/layouts/DashboardLayout";
import Queue from "@/components/views/Member/Queue";

const DashboardMemberPage = () => {
  return (
    <DashboardLayout title="Queue" description="Queue member" type="member">
      <Queue />
    </DashboardLayout>
  );
};

export default DashboardMemberPage;
