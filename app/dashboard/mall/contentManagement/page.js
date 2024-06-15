import React from 'react';
import DashboardLayout from "../../page";
import { fetchContent } from '@/app/actions/mall/data';
import ContentAction from '@/components/formAction/ContentAction';
import CreateContent from '@/components/mall/content/CreateContent';

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Control Center - Announcement",
    description: "Backend Management",
};

const page = async () => {

    const content = await fetchContent() || [];

    return (
        <DashboardLayout >
            <div className="content-information-wrapper">
                <div className="inner-information-wrapper">
                    <CreateContent />
                    <div className="global-table responsive-table">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Title</th>
                                    <th>Created At</th>
                                    <th></th>
                                    <th>Operate</th>
                                </tr>
                                {
                                    content?.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data?.title}</td>
                                            <td>{data?.createdAt.toLocaleString()}</td>
                                            <ContentAction
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