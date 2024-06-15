import React from 'react';
import DashboardLayout from "../../page";
import Pagination from '@/components/pagination/Pagination';
import Search from '@/components/users/Search';
import { fetchOrders } from '@/app/actions/orders/data';

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Control Center - Orders",
    description: "Backend Management",
};

const page = async ({searchParams}) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const limit = searchParams?.limit || 10;

    const { orders, count } = await fetchOrders(q, page, limit) || [];

    return (
        <DashboardLayout >
            <div className="content-information-wrapper">
                <div className="inner-information-wrapper">
                    <Search />
                    <div className="global-table responsive-table">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Username</th>
                                    <th>Phone Number</th>
                                    <th>Order Number</th>
                                    <th>Product Name</th>
                                    <th>Product Price</th>
                                    <th>Purchasing Quantity</th>
                                    <th>Order Commission</th>
                                    <th>Order Amount</th>
                                    <th>Created At</th>
                                </tr>
                                {
                                    orders?.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data?.order_id}</td>
                                            <td>{data?.username}</td>
                                            <td>{data?.phone_number}</td>
                                            <td>{data?._id?.toString().padStart(6, '0').slice(-6)}</td>
                                            <td>{data?.product_name}</td>
                                            <td>{data?.product_price}</td>
                                            <td>{data?.order_quantity}</td>
                                            <td>{data?.order_commission}</td>
                                            <td>{data?.order_amount}</td>
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