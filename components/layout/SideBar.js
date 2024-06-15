"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SideBar = ({ user }) => {
    const pathname = usePathname();
    const router = useRouter();

    const showSystemMenu = pathname.includes('/dashboard/system');
    const showMembershipMenu = pathname.includes('/dashboard/membership');
    const showMembershipAltMenu = pathname.includes('/dashboard/journey');
    const showTradeMenu = pathname.includes('/dashboard/trade');
    const showMallMenu = pathname.includes('/dashboard/mall');
    const showReportMenu = pathname.includes('/dashboard/analytics');

    useEffect(() => {
        if (pathname === '/dashboard') {
            router.replace('/dashboard/analytics');
        }
    }, []);

    return (
        <div className="side-bar-wrapper">
            <h2>Control Center</h2>
            <p>v1.0.0</p>
            {showReportMenu && (
                <ul>
                    <h3>Platform Analytics <i className="fa fa-angle-down"></i></h3>
                    <Link href="/dashboard/analytics">
                        <li className={`${pathname === "/dashboard/analytics" ? "nav-active" : ""}`}>
                            <i className="fa fa-line-chart"></i> Analytics
                        </li>
                    </Link>
                    <Link href="/dashboard/analytics/share">
                        <li className={`${pathname === "/dashboard/analytics/share" ? "nav-active" : ""}`}>
                            <i className="fa fa-share"></i> Share
                        </li>
                    </Link>
                </ul>
            )}
            {showMembershipMenu && (
                <ul>
                    <h3>Member Management <i className="fa fa-angle-down"></i></h3>
                    <Link href="/dashboard/membership/list">
                        <li className={`${pathname === "/dashboard/membership/list" ? "nav-active" : ""}`}>
                            <i className="fa fa-user"></i> Member List
                        </li>
                    </Link>
                    {
                        user?.role === "superAdmin"
                            ?
                            <>
                                <Link href="/dashboard/membership/grade">
                                    <li className={`${pathname === "/dashboard/membership/grade" ? "nav-active" : ""}`}>
                                        <i className="fa fa-bar-chart"></i> Member Level
                                    </li>
                                </Link>
                                <Link href="/dashboard/membership/agent">
                                    <li className={`${pathname === "/dashboard/membership/agent" ? "nav-active" : ""}`}>
                                        <i className="fa-solid fa-code-branch"></i> Agent Management
                                    </li>
                                </Link>
                            </>
                            :
                            <>
                            </>
                    }
                </ul>
            )}
            {showMembershipAltMenu && (
                <ul>
                    <h3>Member Management <i className="fa fa-angle-down"></i></h3>
                    <Link href="/dashboard/membership/list">
                        <li className={`${pathname === "/dashboard/membership/list" ? "nav-active" : ""}`}>
                            <i className="fa fa-user"></i> Member List
                        </li>
                    </Link>
                    <Link href="/dashboard/membership/grade">
                        <li className={`${pathname === "/dashboard/membership/grade" ? "nav-active" : ""}`}>
                            <i className="fa fa-bar-chart"></i> Member Level
                        </li>
                    </Link>
                    <Link href="/dashboard/membership/agent">
                        <li className={`${pathname === "/dashboard/membership/agent" ? "nav-active" : ""}`}>
                            <i className="fa-solid fa-code-branch"></i> Agent Management
                        </li>
                    </Link>
                </ul>
            )}
            {showTradeMenu && (
                <ul>
                    <h3>Trade Management <i className="fa fa-angle-down"></i></h3>
                    {
                        user?.role === "superAdmin"
                            ?
                            <>
                                <Link href="/dashboard/trade/withdrawalList">
                                    <li className={`${pathname === "/dashboard/trade/withdrawalList" ? "nav-active" : ""}`}>
                                        <i className="fa fa-exchange"></i> Withdrawal
                                    </li>
                                </Link>
                            </>
                            :
                            <>
                            </>
                    }
                    <Link href="/dashboard/trade/orderList">
                        <li className={`${pathname === "/dashboard/trade/orderList" ? "nav-active" : ""}`}>
                            <i className="fa fa-box"></i> Order
                        </li>
                    </Link>
                    <Link href="/dashboard/trade/accountChange">
                        <li className={`${pathname === "/dashboard/trade/accountChange" ? "nav-active" : ""}`}>
                            <i className="fa fa-mobile-alt"></i> Account Change
                        </li>
                    </Link>
                    <Link href="/dashboard/trade/rechargeList">
                        <li className={`${pathname === "/dashboard/trade/rechargeList" ? "nav-active" : ""}`}>
                            <i className="fa fa-dollar"></i> Recharge
                        </li>
                    </Link>
                </ul>
            )}
            {showMallMenu && (
                <ul>
                    <h3>Trade Management <i className="fa fa-angle-down"></i></h3>
                    <Link href="/dashboard/mall/announcement">
                        <li className={`${pathname === "/dashboard/mall/announcement" ? "nav-active" : ""}`}>
                            <i className="fa fa-bullhorn"></i> Announcement
                        </li>
                    </Link>
                    <Link href="/dashboard/mall/contentManagement">
                        <li className={`${pathname === "/dashboard/mall/contentManagement" ? "nav-active" : ""}`}>
                            <i className="fa fa-book"></i> Content
                        </li>
                    </Link>
                    <Link href="/dashboard/mall/productManagement">
                        <li className={`${pathname === "/dashboard/mall/productManagement" ? "nav-active" : ""}`}>
                            <i className="fa fa-receipt"></i> Products
                        </li>
                    </Link>
                </ul>
            )}
            {showSystemMenu && (
                <ul>
                    <h3>System Management <i className="fa fa-angle-down"></i></h3>
                    <Link href="/dashboard/mall/announcement">
                        <li className={`${pathname === "/dashboard/system/systemUser" ? "nav-active" : ""}`}>
                            <i className="fa fa-user"></i> System User
                        </li>
                    </Link>
                </ul>
            )}
        </div>
    );
}

export default SideBar;
