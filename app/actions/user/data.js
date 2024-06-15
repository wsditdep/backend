"use server";

import { auth } from "@/app/auth";
import { User } from "@/modals/User";
import { connectToDB } from "@/utils/connection";

export const fetchUser = async (q, page, limit) => {
    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = limit || 10;

    const { user } = await auth();
    const __id = user?.id ?? "";
    const role = user?.role ?? "";

    try {
        await connectToDB();


        let users;
        let count;
        if (role === "superAdmin") {
            count = await User.find({
                $and: [
                    { username: { $regex: regex } },
                    { role: { $in: ["user", "practice"] } }
                ]
            }).count();

            users = await User.find({
                $and: [
                    { username: { $regex: regex } },
                    { role: { $in: ["user", "practice"] } }
                ]
            })
                .sort({ createdAt: -1 })
                .limit(ITEM_PER_PAGE)
                .skip(ITEM_PER_PAGE * (page - 1));
        } else {
            count = await User.find({
                $and: [
                    { parent_id: __id },
                    { username: { $regex: regex } },
                    { role: { $in: ["user", "practice"] } }
                ]
            }).count();

            users = await User.find({
                $and: [
                    { parent_id: __id },
                    { username: { $regex: regex } },
                    { role: { $in: ["user", "practice"] } }
                ]
            })
                .sort({ createdAt: -1 })
                .limit(ITEM_PER_PAGE)
                .skip(ITEM_PER_PAGE * (page - 1));
        }

        return { users, count };
    } catch (error) {
        console.log(error)
    }
}

export const fetchAgent = async (q, page) => {
    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = 10;

    try {
        await connectToDB();

        const count = await User.find({
            $and: [
                { username: { $regex: regex } },
                { role: { $in: ["agent", "admin"] } }
            ]
        }).count();


        const users = await User.find({
            $and: [
                { username: { $regex: regex } },
                { role: { $in: ["agent", "admin"] } }
            ]
        })
            .sort({ createdAt: -1 })
            .limit(ITEM_PER_PAGE)
            .skip(ITEM_PER_PAGE * (page - 1));

        return { users, count };
    } catch (error) {
        console.log(error)
    }
}

export const fetchAllAgent = async () => {

    try {
        await connectToDB();

        const agents = await User.find({
            $and: [
                { role: { $in: ["agent", "admin"] } }
            ]
        });

        return agents;
    } catch (error) {
        console.log(error)
    }
}

export const fetchSystemUser = async (q, page, limit) => {
    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = limit || 10;

    try {
        await connectToDB();

        const count = await User.find({
            $and: [
                { username: { $regex: regex } },
                { role: { $in: ["superAdmin", "admin"] } }
            ]
        }).count();


        const users = await User.find({
            $and: [
                { username: { $regex: regex } },
                { role: { $in: ["superAdmin", "admin"] } }
            ]
        })
            .sort({ createdAt: 1 })
            .limit(ITEM_PER_PAGE)
            .skip(ITEM_PER_PAGE * (page - 1));

        return { users, count };
    } catch (error) {
        console.log(error)
    }
}




