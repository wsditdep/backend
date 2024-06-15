"use client";

import { createUser } from "@/app/actions/user/action";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from 'react-hot-toast';
import MultiRangeSlider from "multi-range-slider-react";
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

const CreateUser = ({ membership }) => {

    const router = useRouter();

    const [showModal, setShowModal] = useState(false);

    const [minValue, set_minValue] = useState(30);
    const [maxValue, set_maxValue] = useState(70);
    const [isAllow, setIsAllow] = useState(true);

    const handleInput = (e) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
    };

    const handleForm = async (formData) => {

        formData.append("match_min", minValue);
        formData.append("match_max", maxValue);
        formData.append("allow_withdrawal", isAllow);

        try {
            const response = await createUser(formData);

            if (response.status === 201) {
                toast.success(response.message);
                setShowModal(false);
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
                                <h3>Add User | Add practice account</h3>
                                <i onClick={() => setShowModal(false)} className="fa fa-times"></i>
                            </div>
                            <div className="create-form">
                                <form action={handleForm} >
                                    <div className="create-form-group">
                                        <label>Username <span>*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Please enter user name"
                                            name="username"
                                            required
                                            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                        />
                                        <input
                                            type="hidden"
                                            name="role"
                                            value="practice"
                                        />
                                    </div>
                                    <div className="create-form-group">
                                        <label>Level <span>*</span></label>
                                        <select name="membership_level">
                                            {
                                                membership?.map((data, index) => (
                                                    <option key={index} value={data.membership_name}>{data.membership_name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="create-form-group">
                                        <label>Parent ID <span>*</span></label>
                                        <input
                                            type="number"
                                            placeholder="Please enter parent id"
                                            name="parent_id"
                                            required
                                            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                        />
                                    </div>
                                    <div className="create-form-group">
                                        <label>Phone Number <span>*</span></label>
                                        <input
                                            type="number"
                                            placeholder="Please enter phone number"
                                            title="Please enter at least 8 digits."
                                            name="phone_number"
                                            required
                                            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                        />
                                    </div>
                                    <div className="create-form-group">
                                        <label>Balance <span>*</span></label>
                                        <input
                                            type="number"
                                            placeholder="Please enter balance"
                                            name="balance"
                                            step="any"
                                            required
                                            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                        />
                                    </div>
                                    <div className="create-form-group">
                                        <label>Matching range</label>
                                        <div className="range-slider-wrapper">
                                            <MultiRangeSlider
                                                min={0}
                                                max={100}
                                                step={5}
                                                minValue={minValue}
                                                maxValue={maxValue}
                                                onInput={(e) => {
                                                    handleInput(e);
                                                }}
                                            />
                                            <p className="range_value">{minValue}% - {maxValue}%</p>
                                        </div>
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
                                        <label>Payment password  <span>*</span></label>
                                        <input
                                            type="test"
                                            placeholder="Please enter payment password"
                                            name="withdrawal_pin"
                                            required
                                            pattern="\d{4}"
                                            title="Please enter exactly 4 digits."
                                            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                        />
                                    </div>
                                    <div className="create-form-group">
                                        <label>Whether to allow withdrawal</label>
                                        <div className="toggle-btn-app">
                                            <label className="switch">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked
                                                    onChange={() => setIsAllow(!isAllow)}
                                                />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
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


export default CreateUser