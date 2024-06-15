"use server";

import { connectToDB } from "@/utils/connection";
import { Recharge } from "@/modals/Recharge";

export const fetchRecharge = async (q, page, limit) => {
    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = limit || 10;
    try {
        await connectToDB();

        const count = await Recharge.find().count();
        const recharge = await Recharge.find({ username: { $regex: regex } })
            .sort({ createdAt: -1 })
            .limit(ITEM_PER_PAGE)
            .skip(ITEM_PER_PAGE * (page - 1));;

        return { recharge, count };
    } catch (error) {
        console.log(error)
    }
}