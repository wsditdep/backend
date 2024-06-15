"use client";

import { updateUser } from "@/app/actions/user/action";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from 'react-hot-toast';
import MultiRangeSlider from "multi-range-slider-react";
import { useRouter } from "next/navigation";

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

const UpdateUser = ({ data, membership, isUpdate, setIsUpdate }) => {

    const router = useRouter();

    const [selectedMembership, setSelectedMembership] = useState("");
    const [minValue, set_minValue] = useState(30);
    const [maxValue, set_maxValue] = useState(70);
    const [isAllow, setIsAllow] = useState(true);

    const handleInput = (e) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
    };

    const handleChange = (event) => {
        setSelectedMembership(event.target.value);
    };

    const handleForm = async (formData) => {

        formData.append("match_min", minValue);
        formData.append("match_max", maxValue);
        formData.append("membership_level", selectedMembership);
        formData.append("allow_withdrawal", isAllow);

        try {
            const response = await updateUser(formData);

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
        set_maxValue(data?.match_max);
        set_minValue(data?.match_min);
        setSelectedMembership(data?.membership_level);
    }, []);

    return (
        <div className="create-wrapper">
            {
                isUpdate
                    ?
                    <div className="create-modal-wrapper" onClick={() => setIsUpdate(false)}>
                        <div className="create-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3>Update User</h3>
                                <i onClick={() => setIsUpdate(false)} className="fa fa-times"></i>
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
                                            defaultValue={data?.username ?? ""}
                                            disabled
                                            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
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
                                        <label>Level <span>*</span></label>
                                        <select
                                            name="membership_level"
                                            id="membership_level"
                                            value={selectedMembership}
                                            onChange={handleChange}
                                        >
                                            {membership?.map((data, index) => (
                                                <option key={index} value={data.membership_name}>
                                                    {data.membership_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="create-form-group">
                                        <label>Parent ID <span>*</span></label>
                                        <input
                                            type="number"
                                            placeholder="Please enter parent id"
                                            name="parent_id"
                                            required
                                            defaultValue={data?.parent_id ?? ""}
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
                                            defaultValue={data?.phone_number ?? ""}
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
                                            defaultValue={data?.balance ?? ""}
                                            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                        />
                                    </div>
                                    <div className="create-form-group">
                                        <label>Today Commission</label>
                                        <input
                                            type="number"
                                            placeholder="Please enter today commission"
                                            name="today_commission"
                                            step="any"
                                            required
                                            defaultValue={data?.today_commission ?? ""}
                                            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                        />
                                    </div>
                                    <div className="create-form-group">
                                        <label>Freeze amount</label>
                                        <input
                                            type="number"
                                            placeholder="Please freeze amount"
                                            name="froze_amount"
                                            step="any"
                                            required
                                            defaultValue={data?.froze_amount ?? ""}
                                            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                        />
                                    </div>
                                    <div className="create-form-group">
                                        <label>Credibility <span>*</span></label>
                                        <input
                                            type="number"
                                            placeholder="Please enter credibility"
                                            name="credibility"
                                            step="any"
                                            required
                                            defaultValue={data?.credibility ?? ""}
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
                                        <label>Password</label>
                                        <input
                                            type="text"
                                            placeholder="Please enter password"
                                            name="password"
                                            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                        />
                                    </div>
                                    <div className="create-form-group">
                                        <label>Payment password</label>
                                        <input
                                            type="test"
                                            placeholder="Please enter payment password"
                                            name="withdrawal_pin"
                                            pattern="\d{4}"
                                            title="Please enter exactly 4 digits."
                                            defaultValue={data?.withdrawal_pin ?? ""}
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


export default UpdateUser;