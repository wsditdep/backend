import React from 'react';
import DashboardLayout from "../../page";
import Pagination from '@/components/pagination/Pagination';
import Search from '@/components/users/Search';
import { fetchAccountChange } from '@/app/actions/accountChange/data';
import AccountChangeFilter from '@/components/accountChange/AccountChangeFilter';

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Control Center - Orders",
    description: "Backend Management",
};

const page = async ({ searchParams }) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const limit = searchParams?.limit || 10;
    const sortByType = searchParams?.sortByType || "";

    const { accounts, count } = await fetchAccountChange(q, page, limit, sortByType) || [];

    return (
        <DashboardLayout >
            <div className="content-information-wrapper">
                <div className="inner-information-wrapper">
                    <div className="global-filter-wrapper">
                        <div className="global-filter-childs">
                            <Search />
                        </div>
                        <div className="global-filter-childs">
                            <AccountChangeFilter />
                        </div>
                    </div>
                    <div className="global-table responsive-table">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Username</th>
                                    <th>Amount</th>
                                    <th>Amount After Operation</th>
                                    <th>Type</th>
                                    <th>Created At</th>
                                </tr>
                                {
                                    accounts?.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data?.username}</td>
                                            <td>{data?.amount}</td>
                                            <td>{data?.after_operation}</td>
                                            <td className="form-type">
                                                <p className={
                                                    data?.account_type === "orderCommission" ? "form-type-cyan"
                                                        :
                                                        data?.account_type === "withdrawal" ? "form-type-orange"
                                                            :
                                                            data?.account_type === "credit" ? "form-type-green"
                                                                :
                                                                "form-type-red"
                                                }>
                                                    {
                                                        data?.account_type === "orderCommission" ? "Order Commission"
                                                            :
                                                            data?.account_type === "withdrawal" ? "Withdrawal"
                                                                :
                                                                data?.account_type === "credit" ? "Credit"
                                                                    :
                                                                    "Debit"
                                                    }
                                                </p>
                                            </td>
                                            <td>{data?.createdAt?.toLocaleString()}</td>
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