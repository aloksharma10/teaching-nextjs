import InvoiceModel from '@/model/invoice'
import CustomPriceModal from '@/model/customPrice'
import dbCon from "@/lib/dbcon"
import { isValidObjectId } from 'mongoose'



export async function GET() {
    if (!dbCon()) return Response.json("DB not Connected")

    try {
        // const invoices = await InvoiceModel.find().populate(["pricedProductIds", "customerId"])
        const invoices = (await InvoiceModel.find()
            .populate({
                path: "pricedProductIds",
                populate: {
                    path: "productId",
                },
            })
            .populate("customerId")).reverse();

        return Response.json(invoices)
    } catch (error) {
        return Response.json({ error: error.message })
    }
}
export async function POST(request) {
    if (!dbCon()) return Response.json("DB not Connected")

    try {
        const body = request.json();
        const { invoicedate, customerId, pricedProductIds, totalInvoiceValue, totalTaxGST, totalTaxableValue } = body;

        const bulkDocs = pricedProductIds.map((product) => ({
            productId: product.productId,
            qty: product.qty,
            rate: product.rate,
            taxableValue: product.taxableValue,
            cgstAmt: product.cgstAmt,
            sgstAmt: product.sgstAmt,
            productTotalValue: product.productTotalValue
        }));

        const priceResult = await CustomPriceModal.insertMany(bulkDocs);

        const priceIds = priceResult.map(doc => doc._id.toString());

        const lastInvoice = (await InvoiceModel.find().sort({ id: -1 }).limit(1))[0];
        const autoGenId = (lastInvoice?.id || 1000) + 1;

        const invoiceData2Save = {
            ...body,
            id: autoGenId,
            pricedProductIds: priceIds
        };

        const invoice = await InvoiceModel.create(invoiceData2Save);

        return Response.json(invoice);
    } catch (error) {
        return Response.json({ error: error.message });
    }
}
export async function PUT() {
    if (!dbCon()) return Response.json("DB not Connected")

  try {
        const id = request.params.id
        const body = request.json()
        // TODO: validation
        const invoiceupdate = await InvoiceModel.findByIdAndUpdate(id, body)
        return Response.json(invoiceupdate)
    } catch (error) {
        return Response.json({ error: error.message })
    }   
}
export async function DELETE() {
    if (!dbCon()) return Response.json("DB not Connected")

    try {
        const id = request.params.id
        const delinvoice = await InvoiceModel.findByIdAndDelete(id)
        return Response.json(delinvoice)
    } catch (error) {
        return Response.json({ error: error.message })
    }
}


// const getInvoiceById = async (request, Response) {
//         const invoices = await InvoiceModel.findOne({ id: request.params.id }).populate(["pricedProductIds", "customerId"])
//         return Response.json(invoices)
//     } catch (error) {
//         return Response.json({ error: error.message })
//     }
// }
