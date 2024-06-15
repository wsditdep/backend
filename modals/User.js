import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
    },
    parent_id: {
        type: Number,
        required: true,
    },
    phone_number: {
        type: Number,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    daily_available_order: {
        type: Number,
        required: true,
    },
    today_order: {
        type: Number,
        required: true,
    },
    today_commission: {
        type: Number,
        required: true,
    },
    parent_user: {
        type: String,
        required: true,
    },
    invitation_code: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    membership_level: {
        type: String,
        required: true,
    },
    froze_amount: {
        type: Number,
        default: 0
    },
    wallet_name: {
        type: String,
        default: null
    },
    wallet_address: {
        type: String,
        default: null
    },
    network_type: {
        type: String,
        default: null
    },
    withdrawal_pin: {
        type: Number,
    },
    withdrawal: {
        type: String,
        default: null
    },
    match_min: {
        type: Number,
        required: true,
    },
    match_max: {
        type: Number,
        required: true,
    },
    last_login: {
        type: String,
        default: "date---"
    },
    allow_withdrawal: {
        type: Boolean,
        default: true
    },
    security_code: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    journeyHistory: {
        type: String,
        default: null
    },
    journey: {
        type: String,
        default: null
    },
    credibility: {
        type: Number,
        default: 100
    },
    connected_account: {
        type: String,
        default: null
    },
    connected_agent_username: {
        type: String,
        default: null
    }
}, { timestamps: true });


export const User = mongoose.models.User || mongoose.model("User", userSchema);