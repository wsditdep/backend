"use client";

import Link from 'next/link';
import Recharge from '../recharge/Recharge';
import { useState } from 'react';
import AlertBox from '../alertBox/AlertBox';
import { toast } from 'react-hot-toast';
import { resetUser } from '@/app/actions/user/action';
import UpdateUser from '../users/UpdateUser';
import UpdateWalletaddress from '../users/UpdateWalletaddress';
import { useRouter } from 'next/navigation';

export const UserAction = ({ data, membership, index }) => {

    const router = useRouter();

    const [showModal, setShowModal] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isWalletAddress, setIsWalletAddress] = useState(false);

    const handleReset = async (id) => {
        try {
            const response = await resetUser(id);

            if (response.status === 201) {
                toast.success(response.message);
                setIsReset(false);
                router.refresh();
                return;
            } else {
                setIsReset(false);
                toast.error(response.message);
            }

        } catch (error) {
            setIsReset(false);
            console.log(error)
        }
    }

    return (
        <>
            <td className="translate_enble">
                <Recharge data={data} showModal={showModal} setShowModal={setShowModal} />
                <UpdateUser membership={membership} data={data} isUpdate={isUpdate} setIsUpdate={setIsUpdate} />
                <UpdateWalletaddress data={data} isWalletAddress={isWalletAddress} setIsWalletAddress={setIsWalletAddress} />
                {
                    isReset
                        ?
                        <AlertBox
                            id={data?._id}
                            showConfirm={isReset}
                            setShowConfirm={setIsReset}
                            handleDelete={handleReset}
                            title={`Reset the number of received orders`}
                            subTitle={`Confirm reset "${data?.username}" number of received orders?!`}
                        />
                        :
                        <></>
                }
            </td>
            <td className="table-operations list-table-last-child translate_enble" style={{zIndex: index}}>
                <div className="table-operation-childs">
                    <Link href={`/dashboard/journey/${data?._id}`}>
                        <button className="btn-primary mr-4 mb-4">Set up orders</button>
                    </Link>
                    <button className="btn-tertiary mr-4 mb-4" onClick={() => setIsReset(true)}>Reset order quantity</button>
                </div>
                <div className="table-operation-childs">
                    <button className="btn-secondary mr-4 mb-4" onClick={() => setShowModal(true)}>Add Debit</button>
                    <button className="btn-outline mr-4 mb-4 include-sub-menu">
                        More actions
                        <div className="sub-menu">
                            <ul>
                                <li onClick={() => setIsWalletAddress(true)}><i className="fa fa-angle-right"></i> Wallet Information</li>
                                <li onClick={() => setIsUpdate(true)}><i className="fa fa-angle-right"></i> Edit</li>
                            </ul>
                        </div>
                    </button>
                </div>
            </td>
        </>
    )
}
