import React from 'react';
import DashboardLayout from "../../page";
import { fetchMembership } from '@/app/actions/membership/data';
import { fetchAgent } from '@/app/actions/user/data';
import Search from '@/components/users/Search';
import Pagination from '@/components/pagination/Pagination';
import { UserAction } from '@/components/formAction/UserAction';
import BlockUser from '@/components/users/BlockUser';
import CreateUser from '@/components/agent/CreateAgent';

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Control Center - Agents",
    description: "Backend Management",
};

const page = async ({ searchParams }) => {

    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;

    const membership = await fetchMembership();
    const { users, count } = await fetchAgent(q, page);

    return (
        <DashboardLayout >
            <div className="content-information-wrapper">
                <div className="inner-information-wrapper">
                    <Search />
                    <CreateUser membership={JSON.parse(JSON.stringify(membership))} />
                    <div className="global-table responsive-table">
                        <table>
                            <tbody>
                                <tr>
                                    <th className="sticky-left-props">ID</th>
                                    <th>Username</th>
                                    <th>Superior ID</th>
                                    <th>Phone Number</th>
                                    <th>Balance</th>
                                    <th>Available for daily order</th>
                                    <th>Taking orders today</th>
                                    <th>Today's commission</th>
                                    <th>Credibility</th>
                                    <th>Superior user</th>
                                    <th>Invitation code</th>
                                    <th>Status</th>
                                    <th>Membership Level</th>
                                    <th>Frozen Amount</th>
                                    <th>Registration time</th>
                                    <th>Last login time</th>
                                    <th></th>
                                    <th>Operate</th>
                                </tr>
                                {
                                    users?.map((data, index) => {
                                        const reversedIndex = users.length - 1 - index; 
                                        return (
                                            <tr key={index}>
                                                <td className="sticky-left-props">{data.id}</td>
                                                <td>{data.username}</td>
                                                <td>{data.parent_id}</td>
                                                <td>{data.phone_number}</td>
                                                <td>{data?.balance?.toFixed(2) ?? ""}</td>
                                                <td>{data.daily_available_order}</td>
                                                <td>{data.today_order}</td>
                                                <td>{data?.today_commission?.toFixed(2) ?? ""}</td>
                                                <td>{data.credibility}</td>
                                                <td>{data.parent_user}</td>
                                                <td>{data.invitation_code}</td>
                                                <td>
                                                    <BlockUser data={JSON.parse(JSON.stringify(data))} />
                                                </td>
                                                <td>{data.membership_level}</td>
                                                <td>{data.froze_amount}</td>
                                                <td>{data.createdAt.toLocaleString()}</td>
                                                <td>{data.createdAt.toLocaleString()}</td>
                                                <UserAction
                                                    membership={JSON.parse(JSON.stringify(membership))}
                                                    data={JSON.parse(JSON.stringify(data))}
                                                    index={JSON.parse(JSON.stringify(reversedIndex))}
                                                />
                                            </tr>
                                        )
                                    })
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

export default page;