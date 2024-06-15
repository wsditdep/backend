"use server";

import { connectToDB } from "@/utils/connection";
import { Order } from "@/modals/Order";

export const fetchOrders = async (q, page, limit) => {
    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = limit || 10;
    try {
        await connectToDB();

        const count = await Order.find().count();
        const orders = await Order.find({ username: { $regex: regex } })
            .sort({ createdAt: -1 })
            .limit(ITEM_PER_PAGE)
            .skip(ITEM_PER_PAGE * (page - 1));;

        return { orders, count };
    } catch (error) {
        console.log(error)
    }
}