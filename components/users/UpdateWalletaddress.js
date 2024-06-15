"use client";

import { createWallet } from "@/app/actions/user/action";
import { useFormStatus } from "react-dom";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Submit({ setIsWalletAddress }) {
    const { pending } = useFormStatus();


    return (
        <>
            {
                pending
                    ?
                    ""
                    :
                    <button className="btn btn-outline mr-4 btn-md" onClick={() => setIsWalletAddress(false)}>Cancle</button>
            }
            <button type="submit" className={pending ? "btn-md btn-tertiary managedDisabled" : "btn-md btn-tertiary"}> {
                pending ?
                    `Please wait...`
                    :
                    `Ok`
            }
            </button>
        </>
    )
}

const UpdateWalletaddress = ({ data, isWalletAddress, setIsWalletAddress }) => {

    const router = useRouter();

    const [selectedType, setSelectedType] = useState("TRC 20");

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const handleForm = async (formData) => {

        formData.append("network_type", selectedType);

        try {
            const response = await createWallet(formData);

            if (response.status === 201) {
                toast.success(response.message);
                setIsWalletAddress(false);
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
        if (data?.network_type !== null) {
            setSelectedType(data?.network_type ?? "TRC 20");
        }
    }, []);

    return (
        <div className="create-wrapper">
            {
                isWalletAddress
                    ?
                    <div className="create-modal-wrapper" onClick={() => setIsWalletAddress(false)}>
                        <div className="create-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3>Wallet Information</h3>
                                <i onClick={() => setIsWalletAddress(false)} className="fa fa-times"></i>
                            </div>
                            <div className="create-form">
                                <form action={handleForm} >
                                    <div className="create-form-group">
                                        <label>Wallet Name</label>
                                        <input
                                            type="text"
                                            placeholder="Please enter wallet name"
                                            name="wallet_name"
                                            required
                                            defaultValue={data?.wallet_name ?? ""}
                                            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                        />
                                        <input
                                            type="hidden"
                                            name="id"
                                            value={data?._id ?? ""}
                                        />
                                    </div>
                                    <div className="create-form-group">
                                        <label>Wallet Address</label>
                                        <input
                                            type="text"
                                            placeholder="Please enter wallet address"
                                            name="wallet_address"
                                            required
                                            defaultValue={data?.wallet_address ?? ""}
                                            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                        />
                                    </div>
                                    <div className="create-form-group">
                                        <label>Network Type</label>
                                        <div className="radio-btn-type">
                                            <div className="radio-btn-type-child">
                                                <label>TRC 20</label>
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value="TRC 20"
                                                    checked={selectedType === 'TRC 20'}
                                                    onChange={handleTypeChange}
                                                />
                                            </div>
                                            <div className="radio-btn-type-child">
                                                <label>ERC 20</label>
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value="ERC 20"
                                                    checked={selectedType === 'ERC 20'}
                                                    onChange={handleTypeChange}
                                                />
                                            </div>
                                            <div className="radio-btn-type-child">
                                                <label>BTC</label>
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value="BTC"
                                                    checked={selectedType === 'BTC'}
                                                    onChange={handleTypeChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="create-form-action">
                                        <Submit setIsWalletAddress={setIsWalletAddress} />
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


export default UpdateWalletaddress;