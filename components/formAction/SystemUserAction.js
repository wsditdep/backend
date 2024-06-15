"use client";

import { useState } from "react";
import AlertBox from "../alertBox/AlertBox";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/app/actions/user/action";
import UpdateSystemUser from "../systemManagement/systemUser/UpdateSystemUser";

const SystemUserAction = ({ data, membership, agents }) => {

    const router = useRouter();

    const [isModal, setIsModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const hanldeDelete = async () => {
        try {
            const response = await deleteUser(data?._id);

            if (response.status === 201) {
                toast.success(response.message);
                setIsModal(false);
                router.refresh();
                return;
            } else {
                setIsModal(false);
                toast.error(response.message);
            }

        } catch (error) {
            setIsModal(false);
            console.log(error)
        }
    }

    return (
        <>
            <td>
                <UpdateSystemUser
                    agents={agents}
                    membership={membership}
                    data={data}
                    isUpdate={isUpdate}
                    setIsUpdate={setIsUpdate}
                />
                {
                    isModal
                        ?
                        <AlertBox
                            id={data?._id}
                            showConfirm={isModal}
                            setShowConfirm={setIsModal}
                            handleDelete={hanldeDelete}
                            title="Confirmation"
                            subTitle="Are you sure you want to delete!"
                        />
                        :
                        <></>
                }
            </td>
            <td className="table-operations">
                <div className="table-operation-childs">
                    <button className="btn-outline mr-4 mb-4" onClick={() => setIsUpdate(true)}>Edit</button>
                    <button className="btn-secondary mr-4 mb-4" onClick={() => setIsModal(true)} >Delete</button>
                </div>
            </td>
        </>
    )
}

export default SystemUserAction