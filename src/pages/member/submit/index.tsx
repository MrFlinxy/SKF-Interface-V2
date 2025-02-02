import DashboardLayout from "@/components/layouts/DashboardLayout";
import Submit from "@/components/views/Member/Submit";

const DashboardMemberPage = () => {
  return (
    <DashboardLayout title="Submit" description="Submit member" type="member">
      <Submit />
    </DashboardLayout>
  );
};

export default DashboardMemberPage;
