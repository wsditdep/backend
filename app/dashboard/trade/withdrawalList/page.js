import React from 'react';
import DashboardLayout from "../../page";
import { fetchWithdrawal } from '@/app/actions/withdrawal/data';
import WithdrawalAction from '@/components/formAction/WithdrawalAction';
import Search from '@/components/users/Search';
// import WithdrawalFilter from '@/components/withdrawal/WithdrawalFilter';

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Control Center - Withdrawal List",
    description: "Backend Management",
};

const page = async () => {

    const withdrawal = await fetchWithdrawal() || [];

    return (
        <DashboardLayout >
            <div className="content-information-wrapper">
                <div className="inner-information-wrapper">
                    <div className="global-filter-wrapper">
                        <div className="global-filter-childs">
                            <Search />
                        </div>
                        <div className="global-filter-childs">
                            {/* <WithdrawalFilter /> */}
                        </div>
                    </div>
                    <div className="global-table responsive-table">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Username</th>
                                    <th>Phone Number</th>
                                    <th>Withdrawal Amount</th>
                                    <th>Withdrawal Name</th>
                                    <th>Network Type</th>
                                    <th>Wallet Address</th>
                                    <th>Request Date</th>
                                    <th>Status</th>
                                    <th></th>
                                    <th>Operate</th>
                                </tr>
                                {
                                    withdrawal?.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data?.username}</td>
                                            <td>{data?.phone_number}</td>
                                            <td>{data?.withdrawal_amount}</td>
                                            <td>{data?.wallet_name}</td>
                                            <td>{data?.network_type}</td>
                                            <td>{data?.wallet_address}</td>
                                            <td>{data?.wallet_createdAt?.toLocaleString()}</td>
                                            <td>{data?.status}</td>
                                            <WithdrawalAction
                                                data={JSON.parse(JSON.stringify(data))}
                                            />
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default page