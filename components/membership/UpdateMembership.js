"use client";

import Link from "next/link";
import { updateMembership } from "@/app/actions/membership/action";
import { useFormStatus } from "react-dom";
import { toast } from 'react-hot-toast';

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

const UpdateMembership = ({ data, setIsUpdate }) => {

    const handleForm = async (formData) => {

        try {
            const response = await updateMembership(formData);

            if (response.status === 201) {
                toast.success(response.message);
                setIsUpdate(false);
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
            <div className="create-modal-wrapper">
                <div className="create-modal">
                    <div className="modal-header">
                        <h3>Edit Membership</h3>
                        <Link href={`/dashboard/membership/grade`}>
                            <i className="fa fa-times"></i>
                        </Link>
                    </div>
                    <div className="create-form">
                        <form action={handleForm}>
                            <input type="hidden" name="id" value={data?._id} />
                            <div className="create-form-group">
                                <label>Membership Name <span>*</span></label>
                                <input
                                    type="text"
                                    name="membership_name"
                                    defaultValue={data?.membership_name}
                                    onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                />
                            </div>
                            <div className="create-form-group">
                                <label>Order quantity <span>*</span></label>
                                <input
                                    type="number"
                                    name="order_quantity"
                                    step="any"
                                    defaultValue={data?.order_quantity}
                                    onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                />
                            </div>
                            <div className="create-form-group">
                                <label>Commission rate <span>*</span></label>
                                <input
                                    type="number"
                                    name="commission_rate"
                                    step="any"
                                    defaultValue={data?.commission_rate}
                                    onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                />
                            </div>
                            <div className="create-form-group">
                                <label>Commission ratio for consecutive orders <span>*</span></label>
                                <input
                                    type="number"
                                    name="ticket_commission"
                                    step="any"
                                    defaultValue={data?.ticket_commission}
                                    onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                />
                            </div>
                            <div className="create-form-group">
                                <label>Number of withdrawals  <span>*</span></label>
                                <input
                                    type="number"
                                    name="number_of_withdrawal"
                                    step="any"
                                    defaultValue={data?.number_of_withdrawal}
                                    onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                />
                            </div>
                            <div className="create-form-group">
                                <label>Minimum withdrawal amount  <span>*</span></label>
                                <input
                                    type="number"
                                    name="min_withdrawal_amount"
                                    step="any"
                                    defaultValue={data?.min_withdrawal_amount}
                                    onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                />
                            </div>
                            <div className="create-form-group">
                                <label>Maximum withdrawal amount  <span>*</span></label>
                                <input
                                    type="number"
                                    name="max_withdrawal_amount"
                                    step="any"
                                    defaultValue={data?.max_withdrawal_amount}
                                    onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                />
                            </div>
                            <div className="create-form-group">
                                <label>Account balance limit <span>*</span></label>
                                <input
                                    type="number"
                                    name="account_balance_limit"
                                    step="any"
                                    defaultValue={data?.account_balance_limit}
                                    onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                />
                            </div>
                            <div className="create-form-action">
                                <Submit setIsUpdate={setIsUpdate} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default UpdateMembership;