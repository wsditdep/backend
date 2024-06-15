import Analytics from "@/components/analytics/Analytics";
import DashboardLayout from "@/app/dashboard/page";
import Share from "@/components/share/Share";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Control Center - Share",
  description: "Backend Management",
};

const page = () => {
  return (
    <>
      <DashboardLayout>
        <Share />
      </DashboardLayout>
    </>
  )
}

export default page;