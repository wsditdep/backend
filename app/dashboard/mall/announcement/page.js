import React from 'react';
import DashboardLayout from "../../page";
import CreateAnnouncement from '@/components/mall/announcement/CreateAnnouncement';
import { fetchNotice } from '@/app/actions/mall/data';
import AnnouncementAction from '@/components/formAction/AnnouncementAction';

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Control Center - Announcement",
    description: "Backend Management",
};

const page = async () => {

    const notice = await fetchNotice() || [];

    return (
        <DashboardLayout >
            <div className="content-information-wrapper">
                <div className="inner-information-wrapper">
                    {
                        notice?.length === 0
                            ?
                            <CreateAnnouncement />
                            :
                            <></>
                    }
                    <div className="global-table responsive-table">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Created At</th>
                                    <th></th>
                                    <th>Operate</th>
                                </tr>
                                {
                                    notice?.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data?.notice_name}</td>
                                            <td>{data?.notice}</td>
                                            <td>{data?.createdAt.toLocaleString()}</td>
                                            <AnnouncementAction
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