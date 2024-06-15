"use server";

import { Commission } from "@/modals/Commission";
import { User } from "@/modals/User";
import { connectToDB } from "@/utils/connection";
import generateReferralCode from "@/utils/generateRefCode";
import generateSecurityCode from "@/utils/generateSecurityCode";
import generateUniqueId from "@/utils/generateid";
import { auth, signIn, signOut } from "@/app/auth";
import bcrypt from "bcryptjs";
import { JourneyHistory } from "@/modals/JourneyHistory";
import { Recharge } from "@/modals/Recharge";
import mongoose from "mongoose";
import { AccountChange } from "@/modals/AccountChange";

export const authenticate = async (formData) => {
    const { username, password } = Object.fromEntries(formData);

    if (!username) return {
        message: "Please enter username",
        status: 404,
        type: "danger"
    };

    if (!password) return {
        message: "Please enter password",
        status: 404,
        type: "danger"
    };

    try {
        await signIn("credentials", { username, password });
        return {
            message: "Logged in successfully",
            status: 201,
            type: "success"
        };

    } catch (err) {
        if (err.message.includes("CredentialsSignin")) {
            return {
                message: `Invalid username or password!, try again!`,
                status: 404,
                type: "danger"
            };
        }
        throw err;
    }
};

export const logout = async () => {

    try {
        await signOut();
    } catch (err) {
        console.log(err)
    }
};

export const createUser = async (formData) => {

    try {
        await connectToDB();

        let {
            // id,
            username,
            role,
            parent_id,
            phone_number,
            balance,
            // daily_available_order,
            // today_order,
            // today_commission,
            // parent_user,
            // invitation_code,
            // status,
            membership_level,
            // froze_amount,
            // wallet_address,
            withdrawal_pin,
            password,
            // network_type,
            match_min,
            match_max,
            allow_withdrawal,
            connected_agent_username,
            // security_code,
            // admin_passcode
        } = Object.fromEntries(formData);

        const isUser = await User.findOne({ username: username });

        if (isUser) return {
            message: "Username already taken, please select different username",
            status: 404,
            type: "danger"
        };

        if (!role === "superAdmin") {
            const isPhone = await User.findOne({ phone_number: phone_number });

            if (isPhone) return {
                message: "Phone number is already used!",
                status: 404,
                type: "danger"
            };
        }

        let parent__id;
        let daily_available_order;
        let today_order;
        let today_commission;
        let parent_user;
        let status;
        let froze_amount;
        let wallet_address;
        let network_type;

        let parentInfo;
        if (role === "user" || role === "practice") {
            parentInfo = await User.findOne({ id: parent_id });

            if (!parentInfo) return {
                message: "Invalid parent id!",
                status: 404,
                type: "danger"
            };

            parent_user = parentInfo.username;
            parent__id = parentInfo.id;
        }

        const hasedPassword = await bcrypt.hash(password, 10);

        // generating unique values
        const id = await generateUniqueId();
        const security_code = await generateSecurityCode();
        const invitation_code = await generateReferralCode();

        let membership_info;
        if (role === "user" || role === "practice") {
            membership_info = await Commission.findOne({ membership_name: membership_level });

            if (!membership_info) return {
                message: "Membership not found!",
                status: 404,
                type: "danger"
            };
        }

        if (role === "practice") {
            daily_available_order = membership_info.order_quantity;
            today_order = 0;
            today_commission = 0;
            parent_user = parentInfo?.username;
            status = true;
            froze_amount = 0;
            wallet_address = null;
            network_type = null;
        } else if (role === "user") {
            daily_available_order = membership_info.order_quantity;
            today_order = 0;
            today_commission = 0;
            parent_user = parentInfo?.username;
            status = true;
            froze_amount = 0;
            wallet_address = null;
            network_type = null;
            match_min = 30;
            match_max = 70;
            allow_withdrawal = true;
        } else if (role === "admin") {
            daily_available_order = 0;
            today_order = 0;
            today_commission = 0;
            status = true;
            froze_amount = 0;
            wallet_address = null;
            network_type = null;
            parent__id = 0;
            parent_user = "admin";
        } else if (role === "agent") {
            daily_available_order = 0;
            today_order = 0;
            today_commission = 0;
            status = true;
            froze_amount = 0;
            wallet_address = null;
            network_type = null;
            parent__id = 0;
            parent_user = "admin";

        } else if (role === "superAdmin") {
            daily_available_order = 0;
            today_order = 0;
            today_commission = 0;
            status = true;
            froze_amount = 0;
            wallet_address = null;
            network_type = null;
            parent__id = 0;
            parent_user = "superAdmin";
        }

        const newUser = new User({
            id,
            username,
            role,
            parent_id: parent__id,
            phone_number,
            balance,
            daily_available_order,
            today_order,
            today_commission,
            parent_user,
            invitation_code,
            status,
            membership_level,
            froze_amount,
            wallet_address,
            withdrawal_pin,
            network_type,
            match_min: match_min || 30,
            match_max: match_max || 70,
            allow_withdrawal,
            security_code,
            password: hasedPassword,
            connected_agent_username
        });

        await newUser.save();

        return {
            message: "User added successfully",
            status: 201,
            type: "success"
        };

    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (id) => {

    try {
        connectToDB();

        if (!id) return {
            message: "User not found!",
            status: 404,
            type: "danger"
        };

        await User.findByIdAndDelete(id);

        return {
            message: "User deleted successfully",
            status: 201,
            type: "success"
        };

    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async (formData) => {

    const {
        id,
        membership_level,
        parent_id,
        balance,
        today_commission,
        froze_amount,
        phone_number,
        match_min,
        match_max,
        password,
        withdrawal_pin,
        credibility
    } = Object.fromEntries(formData);

    try {
        await connectToDB();

        const objectId = new mongoose.Types.ObjectId(id);

        const newSecurityCode = await generateSecurityCode();

        if (password === "") {
            const updateFields = {
                membership_level,
                parent_id,
                balance,
                today_commission,
                froze_amount,
                phone_number,
                match_min,
                match_max,
                password,
                withdrawal_pin,
                credibility
            }

            Object.keys(updateFields).forEach(
                (key) => (updateFields[key] === "" || undefined) && delete updateFields[key]
            );

            await User.findByIdAndUpdate(objectId, updateFields);

        } else {

            const hasedPassword = await bcrypt.hash(password, 10);

            const updateFields = {
                membership_level,
                parent_id,
                balance,
                froze_amount,
                today_commission,
                phone_number,
                match_min,
                match_max,
                password: hasedPassword,
                withdrawal_pin,
                credibility,
                security_code: newSecurityCode
            }

            Object.keys(updateFields).forEach(
                (key) => (updateFields[key] === "" || undefined) && delete updateFields[key]
            );

            await User.findByIdAndUpdate(objectId, updateFields);
        }

        return {
            message: "User updated successfully",
            status: 201,
            type: "success"
        };

    } catch (error) {
        console.log(error)
    }

}

export const updateSystemUser = async (formData) => {

    const {
        username,
        password,
        role,
        connected_agent_username
    } = Object.fromEntries(formData);

    try {
        await connectToDB();

        const user = await User.findOne({ username });


        if (!user) return {
            message: "User not found!",
            status: 404,
            type: "danger"
        };

        const objectId = new mongoose.Types.ObjectId(user?._id);

        const newSecurityCode = await generateSecurityCode();

        if (password === "") {
            const updateFields = {
                username,
                role,
                connected_agent_username
            }

            Object.keys(updateFields).forEach(
                (key) => (updateFields[key] === "" || undefined) && delete updateFields[key]
            );

            await User.findByIdAndUpdate(objectId, updateFields);

        } else {

            const hasedPassword = await bcrypt.hash(password, 10);

            const updateFields = {
                username,
                role,
                connected_agent_username,
                password: hasedPassword,
                security_code: newSecurityCode
            }

            Object.keys(updateFields).forEach(
                (key) => (updateFields[key] === "" || undefined) && delete updateFields[key]
            );

            await User.findByIdAndUpdate(objectId, updateFields);
        }

        return {
            message: "User updated successfully",
            status: 201,
            type: "success"
        };

    } catch (error) {
        console.log(error)
    }

}

export const createSystemUser = async (formData) => {

    const {
        username,
        password,
        role,
        connected_agent_username
    } = Object.fromEntries(formData);

    try {
        await connectToDB();

        const user = await User.findOne({ username });

        if (!user) return {
            message: "User not found!",
            status: 404,
            type: "danger"
        };

        if (user?.role === "admin") return {
            message: `User already exsist in the list, check the username "${user?.username}"`,
            status: 404,
            type: "danger"
        };

        const objectId = new mongoose.Types.ObjectId(user?._id);

        const newSecurityCode = await generateSecurityCode();

        const hasedPassword = await bcrypt.hash(password, 10);

        const updateFields = {
            username,
            role,
            connected_agent_username,
            password: hasedPassword,
            security_code: newSecurityCode
        }

        Object.keys(updateFields).forEach(
            (key) => (updateFields[key] === "" || undefined) && delete updateFields[key]
        );

        await User.findByIdAndUpdate(objectId, updateFields);

        return {
            message: "New user added successfully!",
            status: 201,
            type: "success"
        };

    } catch (error) {
        console.log(error)
    }

}

export const rechargeAccount = async (formData) => {

    const { type, amount, _id } = Object.fromEntries(formData);
    const { user: sessionUser } = await auth();

    try {
        await connectToDB();

        const user = await User.findById(_id);

        if (!user) {
            return {
                message: `Something went wrong!`,
                status: 404,
                type: "danger"
            };
        }

        let msg;
        let finalBalance;
        let balance = Number(amount);

        // deposite as froze_amount on specific stage
        // check journey product

        let pendingObject;
        if (user?.journeyHistory !== null) {
            const checkJourneyProduct = await JourneyHistory.findById(user?.journeyHistory);
            const collectAllHistory = checkJourneyProduct?.JourneyHistory;

            const findPending = collectAllHistory?.filter((product) => product.status === "pending");
            pendingObject = findPending[0]
        }

        let frozeAmount;
        let calFrozeAmount;
        if (pendingObject?.isJourneyProduct) {
            calFrozeAmount = user?.froze_amount + balance;
            frozeAmount = calFrozeAmount?.toFixed(2);
        } else {
            calFrozeAmount = user?.froze_amount;
            frozeAmount = calFrozeAmount?.toFixed(2);
        }

        if (type === "credit") {
            msg = `"${amount}" has been created to "${user?.username}" successfully`;
            finalBalance = user?.balance + balance;
        } else {
            msg = `"${amount}" has been debited from "${user?.username}" successfully`;
            finalBalance = user?.balance - balance;
        }

        await AccountChange.create({
            username: user?.username,
            amount: user?.balance,
            after_operation: finalBalance,
            account_type: type
        });

        await User.findByIdAndUpdate(_id, {
            balance: finalBalance?.toFixed(2),
            froze_amount: frozeAmount
        });

        await Recharge.create({
            username: user?.username,
            recharge_by: sessionUser?.username,
            amount: amount,
            recharge_type: type,
            after_recharge: finalBalance?.toFixed(2),
        });

        return {
            message: msg,
            status: 201,
            type: "success"
        };

    } catch (error) {
        console.log(error)
    }
}

export const resetUser = async (id) => {

    try {
        await connectToDB();

        if (!id) return {
            message: `User not found!`,
            status: 404,
            type: "danger"
        };

        await User.findByIdAndUpdate(id, {
            today_order: 0,
            today_commission: 0,
            journeyHistory: null,
            journey: null
        });

        return {
            message: `Reset successfully!`,
            status: 201,
            type: "success"
        };

    } catch (error) {
        console.log(error)
    }
}

export const createWallet = async (formData) => {
    const { wallet_name, wallet_address, network_type, id } = Object.fromEntries(formData);

    try {
        await connectToDB();

        const authenticatedUser = await User.findById(id);

        if (!authenticatedUser) return {
            message: `User not found!`,
            status: 404,
            type: "danger"
        };

        const updateFields = {
            wallet_name,
            wallet_address,
            network_type
        }

        Object.keys(updateFields).forEach(
            (key) => (updateFields[key] === "" || undefined) && delete updateFields[key]
        );

        await User.findByIdAndUpdate(authenticatedUser?._id, updateFields);

        return {
            message: "Wallet information saved successfully",
            status: 201,
            type: "success"
        };

    } catch (error) {
        console.log(error)
    }
}

export const blockUser = async (formData) => {
    const { id, status } = Object.fromEntries(formData);

    try {
        await connectToDB();

        const authenticatedUser = await User.findById(id);

        if (!authenticatedUser) return {
            message: `User not found!`,
            status: 404,
            type: "danger"
        };

        const newSecurityCode = await generateSecurityCode();
        console.log(newSecurityCode)

        await User.findByIdAndUpdate(authenticatedUser?._id, {
            status,
            security_code: newSecurityCode
        });

        let message;
        if (status === "true") {
            message = `User unblock blocked successfully`
        } else {
            message = `User blocked successfully`
        }

        return {
            message: message,
            status: 201,
            type: "success"
        };

    } catch (error) {
        console.log(error)
    }
}

export const changePassword = async (formData) => {
    const {
        id,
        password,
    } = Object.fromEntries(formData);

    try {
        await connectToDB();

        if (!id) return {
            message: `User not found!`,
            status: 404,
            type: "danger"
        };

        const authenticatedUser = await User.findById(id);

        if (!authenticatedUser) return {
            message: `User not found!`,
            status: 404,
            type: "danger"
        };

        const hasedPassword = await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate(id, {
            password: hasedPassword
        })

        return {
            message: `Your password has been changed!`,
            status: 201,
            type: "success"
        };

    } catch (error) {
        console.log(error)
    }
}
