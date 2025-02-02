import DashboardLayout from "@/components/layouts/DashboardLayout";
import Assignment from "@/components/views/Member/Assignment";

const DashboardMemberPage = () => {
  return (
    <DashboardLayout
      title="Assignment"
      description="Assignment member"
      type="member"
    >
      <Assignment />
    </DashboardLayout>
  );
};

export default DashboardMemberPage;
