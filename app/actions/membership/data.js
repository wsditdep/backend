"use server";

import { Commission } from "@/modals/Commission";
import { connectToDB } from "@/utils/connection"

export const fetchMembership = async () => {
    try {
        connectToDB();

        const membership = await Commission.find();

        return membership;
    } catch (error) {
        console.log(error)
    }
}


export const fetchSingleMembership = async (id) => {
    try {
        connectToDB();

        const membership = await Commission.findById(id);

        return membership;
    } catch (error) {
        console.log(error)
    }
}