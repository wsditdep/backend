"use client";

import Link from "next/link";
import Logout from "../auth/Logout";
import { usePathname } from 'next/navigation';
import toast from "react-hot-toast";

const SecondaryBar = ({ user }) => {

    const pathname = usePathname();
    const parts = pathname.split('/');
    const matchVal = parts[2];

    const copyToClipboard = (val) => {
        navigator.clipboard.writeText(val);
        return toast.success(`Copied - (${val})`);
    }

    return (

        <div className="navigation-wrapper">
            <div className="navigation-parent">
                <div className="navigation-childs">
                    <ul>
                        <li className={`${matchVal === "analytics" ? "active-side-tab " : ""}`}>
                            <Link href="/dashboard/analytics">
                                <i className="fa fa-line-chart"></i> Analytics
                            </Link>
                        </li>
                        {
                            user?.role === "superAdmin"
                                ?
                                <>
                                    <li className={`${matchVal === "system" ? "active-side-tab " : ""}`}>
                                        <Link href="/dashboard/system/systemUser">
                                            <i className="fa fa-desktop"></i> System Management
                                        </Link>
                                    </li>
                                    <li className={`${matchVal === "mall" ? "active-side-tab " : ""}`}>
                                        <Link href="/dashboard/mall/announcement">
                                            <i className="fa fa-bank"></i> Mall Management
                                        </Link>
                                    </li>
                                </>
                                :
                                <></>
                        }
                        <li className={`${matchVal === "membership" ? "active-side-tab " : ""}`}>
                            <Link href="/dashboard/membership/list">
                                <i className="fa fa-users"></i> Member Management
                            </Link>
                        </li>
                        <li className={`${matchVal === "trade" ? "active-side-tab " : ""}`}>
                            {
                                user?.role === "superAdmin"
                                    ?
                                    <Link href="/dashboard/trade/withdrawalList">
                                        <i className="fa fa-bar-chart"></i> Trade Management
                                    </Link>
                                    :
                                    <Link href="/dashboard/trade/orderList">
                                        <i className="fa fa-bar-chart"></i> Trade Management
                                    </Link>
                            }
                        </li>
                    </ul>
                </div>
                <div className="navigation-childs">
                    {
                        user?.role === "superAdmin"
                            ?
                            <>
                                <div className="loggedin_info">
                                    <Link href="/dashboard/trade/withdrawalList">
                                        <div className="withdrawal-icon">
                                            <p>Withdrawal </p>
                                        </div>
                                    </Link>
                                </div>
                            </>
                            :
                            <>
                            </>
                    }
                    <div className="loggedin_info">
                        <div className="user-letter">
                            <p>{user?.username[0]?.toUpperCase() ?? ""}</p>
                        </div>
                        <h1>{user?.username}</h1>
                        <div className="logout-btn-wrapper">
                            <div className="logout-btn-inner-wrapper">
                                <h3>Hi, {user?.username}</h3>
                                <p>{user?.role}</p>
                                <h4 onClick={()=> copyToClipboard(user?.invitation_code ?? "")}>Invitation Code: {user?.invitation_code ?? ""} <i className="fa fa-file-alt"></i></h4>
                            </div>
                            <ul>
                                <Link href={`/dashboard/user/${user?._id}`}>
                                    <li>Change Password</li>
                                </Link>
                            </ul>
                            <Logout />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecondaryBar;