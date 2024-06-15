"use client";

import { useState } from "react";
import AlertBox from "../alertBox/AlertBox";
import { withdrawalResponse } from "@/app/actions/withdrawal/action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const WithdrawalAction = ({ data }) => {

    const router = useRouter();

    const [isApprove, setIsApprove] = useState(false);
    const [isReject, setIsReject] = useState(false);

    const hanldeApprove = async () => {
        try {
            const response = await withdrawalResponse(data?.id, "approved");

            if (response.status === 201) {
                toast.success(response.message);
                setIsApprove(false);
                router.refresh();
                return;
            } else {
                setIsApprove(false);
                toast.error(response.message);
            }

        } catch (error) {
            setIsApprove(false);
            console.log(error)
        }
    }

    const handleRejection = async (id) => {
        try {
            const response = await withdrawalResponse(data?.id, "rejected");

            if (response.status === 201) {
                toast.success(response.message);
                setIsApprove(false);
                router.refresh();
                return;
            } else {
                setIsApprove(false);
                toast.error(response.message);
            }

        } catch (error) {
            setIsApprove(false);
            console.log(error)
        }
    }

    return (
        <>
            <td>
                {
                    isReject
                        ?
                        <AlertBox
                            id={data?._id}
                            showConfirm={isReject}
                            setShowConfirm={setIsReject}
                            handleDelete={handleRejection}
                            title={`Alert - Rejection?`}
                            subTitle={`Confirm the withdrawal of "${data?.username}"!`}
                        />
                        :
                        <></>
                }
                {
                    isApprove
                        ?
                        <AlertBox
                            id={data?._id}
                            showConfirm={isApprove}
                            setShowConfirm={setIsApprove}
                            handleDelete={hanldeApprove}
                            title={`Alert - Approval?`}
                            subTitle={`Confirm the withdrawal of "${data?.username}"!`}
                        />
                        :
                        <></>
                }
            </td>
            <td className="table-operations">
                <div className="table-operation-childs">
                    {
                        data?.status === "pending"
                            ?
                            <>
                                <button className="btn-tertiary mr-4 mb-4" onClick={() => setIsApprove(true)}>Approve</button>
                                <button className="btn-secondary mr-4 mb-4" onClick={() => setIsReject(true)} >Reject</button>
                            </>
                            :
                            <>
                                <p className="non-operation">Responded</p>
                            </>
                    }
                </div>
            </td>
        </>
    )
}

export default WithdrawalAction