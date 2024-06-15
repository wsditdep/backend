"use client";

import { createSystemUser, createUser, updateSystemUser } from "@/app/actions/user/action";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";

function Submit({ setShowModal }) {
    const { pending } = useFormStatus();

    return (
        <>
            {
                pending
                    ?
                    ""
                    :
                    <button className="btn btn-outline mr-4 btn-md" onClick={() => setShowModal(false)}>Cancle</button>
            }
            <button type="submit" className={pending ? "btn-md btn-tertiary managedDisabled" : "btn-md btn-tertiary"}> {
                pending ?
                    `Please wait...`
                    :
                    `Add`
            }
            </button>
        </>
    )
}

const CreateSystemUser = ({ agents }) => {

    const router = useRouter();

    const [showModal, setShowModal] = useState(false);
    const [manageUsername, setManageUsername] = useState("");

    const handleUsername = (e) => {
        setManageUsername(e.target.value);
    }

    const handleForm = async (formData) => {

        try {
            const response = await createSystemUser(formData);

            if (response.status === 201) {
                toast.success(response.message);
                setShowModal(false);
                setManageUsername("");
                router.refresh();
                return;
            } else {
                toast.error(response.message);
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="create-wrapper">
            <div className="create-btn">
                <button onClick={() => setShowModal(true)} className="btn btn-tertiary"><i className="fa fa-plus"></i> New</button>
            </div>
            {
                showModal
                    ?
                    <div className="create-modal-wrapper" onClick={() => setShowModal(false)}>
                        <div className="create-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3>Add System User</h3>
                                <i onClick={() => setShowModal(false)} className="fa fa-times"></i>
                            </div>
                            <div className="create-form">
                                <form action={handleForm} >
                                    <div className="create-form-group">
                                        <label>Username <span>*</span></label>
                                        <input
                                            className="disabled_fields"
                                            type="text"
                                            placeholder="Fetch automatically"
                                            name="username"
                                            value={manageUsername}
                                            required
                                            readOnly
                                            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                        />
                                        <input
                                            type="hidden"
                                            name="connected_agent_username"
                                            value={manageUsername}
                                        />
                                    </div>
                                    <div className="create-form-group">
                                        <label>Password  <span>*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Please enter password"
                                            name="password"
                                            required
                                            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                        />
                                    </div>
                                    <div className="create-form-group">
                                        <label>Role  <span>*</span></label>
                                        <select name="role">
                                            <option value="admin">Admin</option>
                                            <option value="superAdmin">Super Admin</option>
                                        </select>
                                    </div>
                                    <div className="create-form-group">
                                        <label>Agent  <span>*</span></label>
                                        <select onChange={(e) => handleUsername(e)}>
                                            <option>--Select Agent--</option>
                                            {
                                                agents?.map((data, index) => (
                                                    <option key={index} value={data?.username}>{data?.username}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="create-form-action">
                                        <Submit setShowModal={setShowModal} />
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


export default CreateSystemUser;