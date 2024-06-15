import { fetchAllProducts } from "@/app/actions/product/data";
import DashboardLayout from "../../page";
import Journey from "@/components/journey/Journey";
import { fetchUserInfo, fetchUserJourney } from "@/app/actions/journey/data";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Control Center - Set continuous order",
    description: "Backend Management",
};

const page = async ({ params }) => {

    const { id } = params;

    const products = await fetchAllProducts() || [];
    const user = await fetchUserInfo(id) || {};
    const journey = await fetchUserJourney(id) || {};

    return (
        <DashboardLayout >
            <Journey
                products={JSON.parse(JSON.stringify(products))}
                userInfo={JSON.parse(JSON.stringify(user))}
                journeyData={JSON.parse(JSON.stringify(journey))}
            />
        </DashboardLayout>
    )
}

export default page;