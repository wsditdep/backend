import React from 'react';
import DashboardLayout from "../../page";
import ProductAction from '@/components/formAction/ProductAction';
import { fetchProducts } from '@/app/actions/product/data';
import Search from '@/components/users/Search';
import Pagination from '@/components/pagination/Pagination';
import CreateProduct from '@/components/product/CreateProduct';
import ProductFilter from '@/components/product/ProductFilter';

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Control Center - Products",
    description: "Backend Management",
};

const page = async ({ searchParams }) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const sortByPrice = searchParams?.sortByPrice || "";
    const limit = searchParams?.limit || 10;

    const { products, count } = await fetchProducts(q, page, sortByPrice, limit);

    return (
        <DashboardLayout >
            <div className="content-information-wrapper">
                <div className="inner-information-wrapper">
                    <div className="global-filter-wrapper">
                        <div className="global-filter-childs">
                            <Search />
                        </div>
                        <div className="global-filter-childs">
                            <ProductFilter />
                        </div>
                    </div>
                    <CreateProduct />
                    <div className="global-table responsive-table">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Product Price</th>
                                    <th>Created At</th>
                                    <th></th>
                                    <th>Operate</th>
                                </tr>
                                {
                                    products?.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data?.productName}</td>
                                            <td>{data?.productPrice}</td>
                                            <td>{data?.createdAt.toLocaleString()}</td>
                                            <ProductAction
                                                data={JSON.parse(JSON.stringify(data))}
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