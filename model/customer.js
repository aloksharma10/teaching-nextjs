import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    customerName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        requried: true
    },
    gstIn: {
        type: String,
        requried: true
    },
    state: {
        type: String,
        required: true
    },
    stateCode: {
        type: Number,
        required: true
    },
    invoiceIds: {
        type: [mongoose.Types.ObjectId],
        ref: "invoice",
    }
}, { timestamps: true })

const CustomerModel = mongoose.models.customer || mongoose.model('customer', CustomerSchema)
export default CustomerModel