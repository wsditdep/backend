"use client";

import { createJourney } from "@/app/actions/journey/action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

const Journey = ({ products, userInfo, journeyData }) => {
    const router = useRouter();

    const journey = journeyData?.journey || [];
    const [journeyProduct, setJourneyProduct] = useState(journey);
    const [stage, setState] = useState(0);

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products || []);

    const handleInputChange = (e) => {
        const inputVal = e.target.value;
        setState(inputVal);

        const updatedJourney = journeyProduct.map((element, index) => {
            return {
                ...element,
                stage: Number(inputVal) + 1 + index
            };
        });

        setJourneyProduct(updatedJourney);
    }

    const replaceNextOrder = async (productInfo) => {

        if (journeyProduct.length === 0) {
            return toast.error("No product selected!");
        }

        const firstProduct = journeyProduct[0];

        // Find index of firstProduct based on _id and productName
        const firstProductIndex = journeyProduct.findIndex(item => (
            item._id === firstProduct?._id && item.productName === firstProduct?.productName
        ));

        // Filter out firstProduct based on _id and productName
        const restProduct = journeyProduct.filter(item => (
            item._id !== firstProduct?._id || item.productName !== firstProduct?.productName
        ));

        const newObj = {
            ...productInfo,
            status: "pointed",
            stage: firstProduct?.stage,
            isJourneyProduct: true
        }

        const updatedJourneyProduct = [
            ...restProduct.slice(0, firstProductIndex),
            newObj,
            ...restProduct.slice(firstProductIndex)
        ];

        setJourneyProduct(updatedJourneyProduct);

        if (journeyProduct.length === 0) {
            return toast.error("No product selected");
        }

        const formData = new FormData();
        formData.append("userId", userInfo?._id);
        formData.append("journeyProduct", JSON.stringify(updatedJourneyProduct));

        try {
            const response = await createJourney(formData);

            if (response.status === 201) {
                toast.success(response.message);
                router.refresh();
                return;
            } else {
                router.refresh();
                toast.error(response.message);
            }

        } catch (error) {
            console.log(error)
        }
    }

    // const addProduct = (productInfo) => {
    //     const newStage = Number(stage) + 1;
    //     const newObj = {
    //         ...productInfo,
    //         status: "pointed",
    //         stage: newStage,
    //         isJourneyProduct: true
    //     }

    //     setJourneyProduct([...journeyProduct, newObj]);
    //     setState(prev => Number(prev) + 1);
    //     return;
    // }

    const addProduct = (productInfo) => {

        const maxValue = journeyProduct.reduce((maxObj, currentObj) => {
            return (currentObj.stage > maxObj.stage) ? currentObj : maxObj;
        }, journeyProduct[0]);

        let newStage = (maxValue?.stage ?? 0) + 1;

        const newObj = {
            ...productInfo,
            status: "pointed",
            stage: newStage,
            isJourneyProduct: true
        }

        setJourneyProduct([...journeyProduct, newObj]);

        return;
    }

    const handleScreening = () => {
        const min = parseFloat(minPrice) || 0;
        const max = parseFloat(maxPrice) || Infinity;

        const filtered = products.filter(product => {
            const price = parseFloat(product.productPrice);
            return price >= min && price <= max;
        });

        setFilteredProducts(filtered);
    };

    const removeFromList = (id) => {
        const newProductList = journeyProduct.filter(item => item._id !== id);
        return setJourneyProduct(newProductList);
    }

    const createUserJourney = async () => {
        if (journeyProduct.length === 0) {
            return toast.error("No product selected");
        }

        const formData = new FormData();
        formData.append("userId", userInfo?._id);
        formData.append("journeyProduct", JSON.stringify(journeyProduct));

        try {
            const response = await createJourney(formData);

            if (response.status === 201) {
                toast.success(response.message);
                router.refresh();
                return;
            } else {
                router.refresh();
                toast.error(response.message);
            }

        } catch (error) {
            console.log(error)
        }
    }

    const resetProducts = () => {
        return setJourneyProduct([]);
    }

    const getMaxStageObject = (array) => {
        const maxValue = array.reduce((maxObj, currentObj) => {
            return (currentObj.stage < maxObj.stage) ? currentObj : maxObj;
        }, array[0]);

        if (array?.length === 0) {
            setState(0);
        } else {
            setState((maxValue?.stage ?? 0) - 1);
        }

    };

    useEffect(() => {
        getMaxStageObject(journeyData?.journey ?? []);
    }, []);


    return (
        <>
            <div className="content-information-wrapper">
                <div className="inner-information-wrapper">
                    <div className="journey-wrapper">
                        <div className="journey-heading">
                            <Link href="/dashboard/membership/list"><i className="fa fa-angle-left"></i>Back to list</Link>
                            <h3>Current user: {userInfo?.username}</h3>
                        </div>
                        <div className="form-alt">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="form-alt-group">
                                    <label>Current number of orders made:</label>
                                    <input
                                        value="1"
                                        disabled
                                    />
                                </div>
                                <div className="form-alt-group">
                                    <label>Orders received today:</label>
                                    <input
                                        value={userInfo?.today_order}
                                        disabled
                                    />
                                </div>
                                <div className="form-alt-group">
                                    <label>Maximum orders received by level:</label>
                                    <input
                                        value={userInfo?.daily_available_order}
                                        disabled
                                    />
                                </div>
                                <div className="form-alt-group">
                                    <label>Start continuous orders after several orders:</label>
                                    <input
                                        type="number"
                                        value={stage}
                                        name="stage"
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </div>
                                <div className="manage-continuous-wrapper">
                                    <div className="journey-products">
                                        <div className="journey-product-childs">
                                            <p>Products:</p>
                                        </div>
                                        <div className="journey-product-childs">
                                            {
                                                journeyProduct?.length === 0
                                                    ?
                                                    <p>Please select continuous orders in the product list</p>
                                                    :
                                                    journeyProduct?.map((data, index) => (
                                                        <div className="show-journey-products" key={index}>
                                                            <span>({data?.stage}) {data?.productPrice} {data?.productName}</span> <i onClick={() => removeFromList(data?._id)} className="fa fa-times"></i>
                                                        </div>
                                                    ))
                                            }
                                        </div>
                                    </div>
                                    <div className="journey-submit-action">
                                        <button onClick={() => createUserJourney()} className="btn-md btn-tertiary mr-4">OK</button>
                                        <button className="btn-md btn-secondary" onClick={() => resetProducts()}>Reset countinuous orders</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-information-wrapper">
                <div className="journey-list-all-product">
                    <h3>Product List</h3>
                    <div className="search-panel mt1">
                        <input
                            type="text"
                            placeholder="Lowest Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Highest Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                        <button
                            className="btn btn-tertiary mr-4"
                            onClick={handleScreening}
                        >
                            Screening
                        </button>
                    </div>
                    <ul>
                        <ul>
                            {filteredProducts?.map((data, index) => (
                                <li key={index}>
                                    <div className="product-childs">
                                        <p>{data?.productName}</p>
                                    </div>
                                    <div className="product-childs">
                                        <p>{data?.productPrice}</p>
                                    </div>
                                    <div className="product-childs">
                                        <button
                                            onClick={() => addProduct(data)}
                                            className={journeyProduct?.some(item => item?._id === data?._id) ? "managedDisabled btn btn-tertiary mr1" : "btn btn-tertiary mr1"}
                                        >
                                            Add to Continuous Order
                                        </button>
                                        <button
                                            onClick={() => replaceNextOrder(data)}
                                            className="btn btn-tertiary"
                                        >
                                            Replace Next Order
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Journey