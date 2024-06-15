"use server";

import { Journey } from "@/modals/Journey";
import { User } from "@/modals/User";
import { connectToDB } from "@/utils/connection";

export const createJourney = async (formData) => {
    try {
        await connectToDB();

        const {
            userId,
            journeyProduct
        } = Object.fromEntries(formData);
        
        const journeyProducts = JSON.parse(journeyProduct);
        console.log("----",userId)
        console.log(journeyProduct)

        const user = await User.findById(userId);
        if (!user) return {
            message: "User not found!",
            status: 404,
            type: "danger",
        };

        if (user?.journey === null) {
            const newJourney = new Journey({
                journey: journeyProducts
            })
            await newJourney.save();

            await User.findByIdAndUpdate(userId, {
                journey: newJourney._id
            });
        } else {
            await Journey.findByIdAndUpdate(user.journey, {
                journey: journeyProducts
            });
        }

        return {
            message: "Jouney has been set",
            status: 201,
            type: "success",
        };
    } catch (error) {
        console.log(error)
    }
}