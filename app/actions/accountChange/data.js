"use server";

import { connectToDB } from "@/utils/connection";
import { AccountChange } from "@/modals/AccountChange";

export const fetchAccountChange = async (q, page, limit, sortByType) => {
    let sortByTypeValue;
    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = limit || 10;
    sortByTypeValue = sortByType || "all"

    if (sortByType === "all") {
        sortByTypeValue = "all"
    } else if (sortByType === "credit") {
        sortByTypeValue = "credit"
    } else if (sortByType === "debit") {
        sortByTypeValue = "debit"
    }

    try {
        await connectToDB();

        const count = await AccountChange.find().count();

        let accounts;
        if (sortByTypeValue === "all") {
            accounts = await AccountChange.find({
                username: { $regex: regex }
            })
                .sort({ createdAt: -1 })
                .limit(ITEM_PER_PAGE)
                .skip(ITEM_PER_PAGE * (page - 1));
        } else {
            accounts = await AccountChange.find({
                username: { $regex: regex },
                account_type: sortByTypeValue
            })
                .sort({ createdAt: -1 })
                .limit(ITEM_PER_PAGE)
                .skip(ITEM_PER_PAGE * (page - 1));
        }

        return { accounts, count };
    } catch (error) {
        console.log(error)
    }
}