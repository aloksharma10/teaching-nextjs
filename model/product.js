import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    hsnCode: {
        type: Number,
        required: true
    },
    cgstRate: {
        type: Number,
        required: true,
    },
    sgstRate: {
        type: Number,
        required: true,
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

const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema)

export default ProductModel