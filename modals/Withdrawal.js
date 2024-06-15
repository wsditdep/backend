import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    phone_number: {
        type: Number,
        required: true,
    },
    wallet_name: {
        type: String,
        required: true,
    },
    withdrawal_amount: {
        type: Number,
        required: true,
    },
    wallet_address: {
        type: String,
        required: true,
    },
    network_type: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
}, { _id: false, timestamps: true });

const withdrawalSchema = new mongoose.Schema({
    wallet: [walletSchema],
}, { timestamps: true });

mongoose.models = {};

export const Withdrawal = mongoose.models.Withdrawal || mongoose.model("Withdrawal", withdrawalSchema);
