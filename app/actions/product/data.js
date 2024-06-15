"use server";

import { Product } from "@/modals/Product";
import { connectToDB } from "@/utils/connection";

export const fetchProducts = async (q, page, sortByPrice, limit) => {
    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = limit || 10;

    try {
        await connectToDB();

        const count = await Product.find().count()

        const sortOption = sortByPrice === "asc" ? { productPrice: 1 } : sortByPrice === "desc" ? { productPrice: -1 } : { createdAt: -1 };

        const products = await Product.find({ productName: { $regex: regex } },)
            .sort(sortOption)
            .limit(ITEM_PER_PAGE)
            .skip(ITEM_PER_PAGE * (page - 1));

        return { products, count };
    } catch (error) {
        console.log(error)
    }
}

export const fetchAllProducts = async () => {

    try {
        await connectToDB();

        const products = await Product.find()

        return products;
    } catch (error) {
        console.log(error)
    }
}