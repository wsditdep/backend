"use server";

import { Withdrawal } from "@/modals/Withdrawal";
import { connectToDB } from "@/utils/connection";

export const withdrawalResponse = async (id, respond) => {
    console.log()
    console.log("---------------", id)
    console.log("---------------", respond)
    try {
        await connectToDB();

        const withdrawal = await Withdrawal.aggregate([
            { $unwind: "$wallet" },  // Deconstructs the wallet array
            {
                $project: {
                    "id": "$wallet.id",
                    "username": "$wallet.username",
                    "phone_number": "$wallet.phone_number",
                    "wallet_name": "$wallet.wallet_name",
                    "withdrawal_amount": "$wallet.withdrawal_amount",
                    "wallet_address": "$wallet.wallet_address",
                    "network_type": "$wallet.network_type",
                    "status": "$wallet.status",
                    "wallet_createdAt": "$wallet.createdAt",
                    "wallet_updatedAt": "$wallet.updatedAt",
                    "withdrawal_createdAt": "$createdAt",
                    "withdrawal_updatedAt": "$updatedAt"
                }
            },
            { $match: { "id": id } }
        ]);

        const withdrawalID = withdrawal[0]?._id;

        const pendingObject = withdrawal?.filter(item => item.status === "pending")[0];
        const notPending =  withdrawal?.filter(item => item.status !== "pending");

        const newObj = {
            ...pendingObject,
            status: respond
        }

        const updateArray = [...notPending, newObj];

        console.log("pendingObject---", withdrawal)
        console.log("pendingObject---", pendingObject)
        console.log("remainingObject---", notPending)
        console.log("newObj---", newObj)
        console.log("updateArray---", updateArray)

        await Withdrawal.findByIdAndUpdate(withdrawalID, {
            wallet: updateArray
        });

        let message;

        if (respond === "approved") {
            message = "Approved successfully!"
        } else {
            message = "Rejected successfully!"
        }

        return {
            message: message,
            status: 201,
            type: "success"
        };
    } catch (error) {
        console.log(error);
    }
}