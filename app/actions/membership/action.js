"use server";

import { Commission } from "@/modals/Commission";
import { connectToDB } from "@/utils/connection";
import { revalidatePath } from "next/cache";

export const addMembership = async (formData) => {
    const {
        membership_name,
        order_quantity,
        commission_rate,
        ticket_commission,
        number_of_withdrawal,
        min_withdrawal_amount,
        max_withdrawal_amount,
        account_balance_limit

    } = Object.fromEntries(formData);

    if (!membership_name || !order_quantity || !commission_rate || !ticket_commission || !number_of_withdrawal || !min_withdrawal_amount || !max_withdrawal_amount || !account_balance_limit) {
        return {
            message: "Required field is missing",
            status: 404,
            type: "error"
        };
    }

    try {
        connectToDB();

        const newMembership = new Commission({
            membership_name,
            order_quantity,
            commission_rate,
            ticket_commission,
            number_of_withdrawal,
            min_withdrawal_amount,
            max_withdrawal_amount,
            account_balance_limit,
        });

        await newMembership.save();

        revalidatePath("/dashboard/membership");
        return {
            message: "Membership created successfully",
            status: 201,
            type: "success"
        };

    } catch (error) {
        console.log(error)
    }
};

export const deleteMembership = async (id) => {

    try {
        connectToDB();

        if (!id) {
            return {
                message: "Invalid Identity!",
                status: 404,
                type: "danger"
            };
        }

        await Commission.findByIdAndDelete(id);

        revalidatePath("/dashboard/membership");
        return {
            message: "Membership deleted successfully",
            status: 201,
            type: "success"
        };

    } catch (error) {
        console.log(error)
    }
}

export const updateMembership = async (formData) => {
    const {
        id,
        membership_name,
        order_quantity,
        commission_rate,
        ticket_commission,
        number_of_withdrawal,
        min_withdrawal_amount,
        max_withdrawal_amount,
        account_balance_limit
    } = Object.fromEntries(formData);

    try {
        connectToDB();

        const updateFields = {
            id,
            membership_name,
            order_quantity,
            commission_rate,
            ticket_commission,
            number_of_withdrawal,
            min_withdrawal_amount,
            max_withdrawal_amount,
            account_balance_limit
        };

        Object.keys(updateFields).forEach(
            (key) => (updateFields[key] === "" || undefined) && delete updateFields[key]
        );

        await Commission.findByIdAndUpdate(id, updateFields);

        revalidatePath("/dashboard/membership");
        return {
            message: "Membership created successfully",
            status: 201,
            type: "success"
        };

    } catch (err) {
        console.log(err);
    }

};

export const handleDefaultMambership = async (id) => {
    try {
        await connectToDB();

        if (!id) return {
            message: "Not found!",
            status: 404,
            type: "danger",
        };

        // Unset the current default membership if there is one
        await Commission.updateMany({}, { is_default: false });

        // Set the new default membership
        const updatedMembership = await Commission.findByIdAndUpdate(id, { is_default: true }, { new: true });

        if (!updatedMembership) {
            return {
                message: "Can not set default membership",
                status: 404,
                type: "danger"
            };
        }

        return {
            message: "Default membership updated successfully",
            status: 201,
            type: "success",
        };


    } catch (error) {
        console.log(error)
    }
}