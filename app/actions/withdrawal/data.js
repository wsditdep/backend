"use server";

import { Withdrawal } from "@/modals/Withdrawal";
import { connectToDB } from "@/utils/connection";

export const fetchWithdrawal = async () => {
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
            }
        ])

        return withdrawal;
        
    } catch (error) {
        console.log(error)
    }
}