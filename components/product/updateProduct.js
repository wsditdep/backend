"use client";

import { useFormStatus } from "react-dom";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { updateProduct } from "@/app/actions/product/action";

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
                    `Update`
            }
            </button>
        </>
    )
}

const UpdateProduct = ({ data, setIsUpdate }) => {

    const router = useRouter();

    const handleForm = async (formData) => {

        try {
            const response = await updateProduct(formData);

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

    return (
        <div className="create-wrapper">
            <div className="create-modal-wrapper" onClick={() => setIsUpdate(false)}>
                <div className="create-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h3>Edit Product</h3>
                        <i onClick={() => setIsUpdate(false)} className="fa fa-times"></i>
                    </div>
                    <div className="create-form">
                        <form action={handleForm} >
                            <div className="create-form-group">
                                <label>Product Name <span>*</span></label>
                                <input
                                    type="text"
                                    placeholder="Please enter product name"
                                    name="productName"
                                    defaultValue={data?.productName}
                                    required
                                    onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                />
                                <input
                                    type="hidden"
                                    name="id"
                                    value={data?._id}
                                />
                            </div>
                            <div className="create-form-group">
                                <label>Product Price <span>*</span></label>
                                <input
                                    type="number"
                                    placeholder="Please enter product price"
                                    name="productPrice"
                                    step="any"
                                    defaultValue={data?.productPrice}
                                    required
                                    onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                />
                            </div>
                            <div className="create-form-action">
                                <Submit setShowModal={setIsUpdate} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default UpdateProduct;