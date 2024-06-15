"use client";

import { logout } from "@/app/actions/user/action";
import { useRouter } from "next/navigation";

const Logout = () => {
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/");
        return;
    }

    return (
        <div className="logout-btn-action-btn">
            <button onClick={() => handleLogout()}>Logout <i className="fa fa-sign-in-alt"></i></button>
        </div>
    )
}

export default Logout