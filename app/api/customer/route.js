import { isValidObjectId } from 'mongoose'
import CustomerModel from '@/model/customer'
import dbCon from "@/lib/dbcon"

export async function GET() {
    if(!dbCon()) return Response.json("DB not Connected")

    try {
        const customer = await CustomerModel.find()
        return Response.json(customer)
    } catch (error) {
        return Response.json({ error: error.message })
    }
}

export async function POST(request) {
    if(!dbCon()) return Response.json("DB not Connected")

    try {
        console.log(request,"aman")

        const body = await request.json()
        if (typeof body.customerName !== "string") {
            return Response.json({ error: "Name must be type of string" })
        }
        if (typeof body.address !== "string") {
            return Response.json({ error: "Address must be type of string" })
        }

        if (typeof body.gstIn !== "string") {
            return Response.json({ error: "GSTIN must be type of string" })
        }
        if (typeof body.state !== "string") {
            return Response.json({ error: "STATE must be type of string" })
        }
        if (isNaN(body.stateCode)) {
            return Response.json({ error: "STATE CODE must be type of number" })
        }
        const customer = await CustomerModel.create(body)
        return Response.json(customer)
    } catch (error) {
        return Response.json({ error: error.message })
    }
}





// const getAllCustomer = async (request, Response{
//     try {
//         const customer = await CustomerModel.find()

//         return Response.json(customer)
//     } catch (error) {
//         return Response.json({ error: error.message })
//     }
// }
