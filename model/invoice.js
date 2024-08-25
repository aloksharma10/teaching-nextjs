import mongoose from 'mongoose'
const Schema = mongoose.Schema

const InvoiceSChema = new Schema({
    id: {
        type: Number,
        required: true
    },
    invoicedate: {
        type: Date,
        default: Date.now,
        required: true
    },
    customerId: {
        type: mongoose.Types.ObjectId,
        ref: "customer",
        required: true,
    },
    pricedProductIds: {
        type: [mongoose.Types.ObjectId],
        ref: "customPrice",
        required: true,
    },
    totalTaxableValue: {
        type: Number,
        required: true
    },
    totalTaxGST: {
        type: Number,
        required: true
    },
    totalInvoiceValue: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAtt: {
        type: Date,
        default: Date.now,
    }

}, { timestamps: true })

const InvoiceModel = mongoose.models.invoice || mongoose.model('invoice', InvoiceSChema)

export default InvoiceModel