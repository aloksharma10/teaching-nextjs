import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CustomPriceSchema = new Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product"
    },
    qty: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    taxableValue: {
        type: Number,
        required: true
    },
    cgstAmt: {
        type: Number,
        required: true
    },
    sgstAmt: {
        type: Number,
        required: true
    },
    productTotalValue: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})


const CustomPriceModal = mongoose.models.customPrice || mongoose.model('customPrice', CustomPriceSchema)

export default CustomPriceModal