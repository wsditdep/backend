import React from 'react';
import DashboardLayout from "../../page";
import ChangePassword from '@/components/changePassword/ChangePassword';

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Control Center - Change Password",
    description: "Backend Management",
};

const page = async ({params}) => {

    const { id } = params;

    return (
        <DashboardLayout >
            <div className="content-information-wrapper">
                <div className="inner-information-wrapper">
                   <ChangePassword id={JSON.parse(JSON.stringify(id))}/>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default page