"use client";

import { updateSystemUser } from "@/app/actions/user/action";
import { useFormStatus } from "react-dom";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Submit({ setIsUpdate }) {
    const { pending } = useFormStatus();
    return (
        <>
            {
                pending
                    ?
                    ""
                    :
                    <button className="btn btn-outline mr-4 btn-md" onClick={() => setIsUpdate(false)}>Cancle</button>
            }
            <button type="submit" className={pending ? "btn-md btn-tertiary managedDisabled" : "btn-md btn-tertiary"}> {
                pending ?
                    `Please wait...`
                    :
                    `Update`
            }
            </button>
        </>
    )
}

const UpdateSystemUser = ({ data, isUpdate, setIsUpdate }) => {

    const router = useRouter();

    const [manageRole, setManageRole] = useState("");

    const handleForm = async (formData) => {
        try {
            const response = await updateSystemUser(formData);

            if (response.status === 201) {
                toast.success(response.message);
                setIsUpdate(false);
                router.refresh();
                return;
            } else {
                toast.error(response.message);
            }

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        setManageRole(data?.role);
    }, []);

    return (
        <div className="create-wrapper">
            {
                isUpdate
                    ?
                    <div className="create-modal-wrapper" onClick={() => setIsUpdate(false)}>
                        <div className="create-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3>Update System User</h3>
                                <i onClick={() => setIsUpdate(false)} className="fa fa-times"></i>
                            </div>
                            <div className="create-form">
                                <form action={handleForm} >
                                    <div className="create-form-group">
                                        <label>Username <span>*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Please enter user name"
                                            defaultValue={data?.username ?? ""}
                                            required
                                            disabled
                                            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                        />
                                        <input
                                            type="hidden"
                                            name="username"
                                            value={data?.username ?? ""}
                                        />
                                        <input
                                            type="hidden"
                                            name="connected_agent_username"
                                            value={data?.username ?? ""}
                                        />
                                        <input
                                            type="hidden"
                                            name="role"
                                            value={data?.role}
                                        />
                                        <input
                                            type="hidden"
                                            name="id"
                                            value={data?._id}
                                        />
                                    </div>
                                    <div className="create-form-group">
                                        <label>Password</label>
                                        <input
                                            type="text"
                                            placeholder="Please enter password"
                                            name="password"
                                            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                        />
                                    </div>
                                    <div className="create-form-group">
                                        <label>Role  <span>*</span></label>
                                        <select
                                            name="role"
                                            value={manageRole}
                                            onChange={(e) => setManageRole(e.target.value)}
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="superAdmin">Super Admin</option>
                                        </select>
                                    </div>
                                    <div className="create-form-action">
                                        <Submit setIsUpdate={setIsUpdate} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
            }
        </div>
    )
}


export default UpdateSystemUser;