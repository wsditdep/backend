import React from 'react';
import DashboardLayout from "../../page";
import { fetchRecharge } from '@/app/actions/recharge/data';
import Pagination from '@/components/pagination/Pagination';
import Search from '@/components/users/Search';

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Control Center - Recharge",
    description: "Backend Management",
};

const page = async ({searchParams}) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const limit = searchParams?.limit || 10;

    const { recharge, count } = await fetchRecharge(q, page, limit) || [];

    return (
        <DashboardLayout >
            <div className="content-information-wrapper">
                <div className="inner-information-wrapper">
                    <Search />
                    <div className="global-table responsive-table">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Username</th>
                                    <th>Rechared By</th>
                                    <th>Amount</th>
                                    <th>After Recharge</th>
                                    <th>Recharge Type</th>
                                    <th>Created At</th>
                                </tr>
                                {
                                    recharge?.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data?.username}</td>
                                            <td>{data?.recharge_by}</td>
                                            <td>{data?.amount}</td>
                                            <td>{data?.after_recharge}</td>
                                            <td className="form-type">
                                                <p className={data?.recharge_type === "credit" ? "form-type-green" : "form-type-red"}>{data?.recharge_type}</p>
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