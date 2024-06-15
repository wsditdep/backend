import SecondaryBar from '@/components/layout/SecondaryBar';
import SideBar from '@/components/layout/SideBar';
import { Suspense } from 'react'
import SubLoader from './membership/list/loading';
import { auth } from "../auth";
// import Language from '@/components/language/Language';

export const dynamic = "force-dynamic";

const page = async ({ children }) => {

    const { user } = await auth();

    return (
        <div className="app_layout">
            <Suspense fallback={<SubLoader />}>
                <div className="app-layout-parent">
                    <div className="app-layout-child">
                        <SideBar user={JSON.parse(JSON.stringify(user))}/>
                    </div>
                    <div className="app-layout-child">
                        <SecondaryBar user={JSON.parse(JSON.stringify(user))} />
                        {children}
                    </div>
                </div>
            </Suspense>
            {/* <Language /> */}
        </div>
    )
}

export default page;