import React from 'react';
import DashboardLayout from "../../page";
import CreateSystemUser from '@/components/systemManagement/systemUser/CreateSystemUser';
import { fetchAllAgent, fetchSystemUser } from '@/app/actions/user/data';
import SystemUserAction from '@/components/formAction/SystemUserAction';
import { fetchMembership } from '@/app/actions/membership/data';
import Pagination from '@/components/pagination/Pagination';
import Search from '@/components/users/Search';
import BlockUser from '@/components/users/BlockUser';

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Control Center - System User",
    description: "Backend Management",
};

const page = async ({ searchParams }) => {

    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const limit = searchParams?.limit || 10;

    const membership = await fetchMembership();
    const agents = await fetchAllAgent();

    const { users, count } = await fetchSystemUser(q, page, limit);

    return (
        <DashboardLayout >
            <div className="content-information-wrapper">
                <div className="inner-information-wrapper">
                    <Search />
                    <CreateSystemUser agents={JSON.parse(JSON.stringify(agents))} />
                    <div className="global-table responsive-table">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th>Created At</th>
                                    <th>Status</th>
                                    <th></th>
                                    <th>Operate</th>
                                </tr>
                                {
                                    users?.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data?.username}</td>
                                            <td>{data?.role}</td>
                                            <td>{data?.createdAt.toLocaleString()}</td>
                                            <td>
                                                <BlockUser data={JSON.parse(JSON.stringify(data))} />
                                            </td>
                                            <SystemUserAction
                                                data={JSON.parse(JSON.stringify(data))}
                                                membership={JSON.parse(JSON.stringify(membership))}
                                                agents={JSON.parse(JSON.stringify(agents))}
                                            />
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <Pagination count={count} />
                </div>
            </div>
        </DashboardLayout>
    )
}

export default page