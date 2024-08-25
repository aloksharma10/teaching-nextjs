import { isValidObjectId } from "mongoose"
import ProductModel from "@/model/product"
import dbCon from "@/lib/dbcon"

export async function GET() {
    if (!dbCon()) return Response.json("DB not Connected")

    try {
        const products = await ProductModel.find();  
        return Response.json(products)
    } catch (error) {
        return Response.json({ error: error.message })
    }
}

export async function POST(request) {
    if (!dbCon()) return Response.json("DB not Connected")

    try {
        const body = await request.json()

        if (typeof body.productName !== "string") {
            return Response.json({ error: "Name must be in type of string" })
        }

        if (isNaN(body.hsnCode)) {
            return Response.json({ error: "Hsn Code must be a type of number!" })
        }

        if ((isNaN(body.cgstRate)) || (isNaN(body.sgstRate))) {
            return Response.json({ error: " must be in type of string" })
        }

        const { productName, hsnCode, cgstRate, sgstRate } = body
        const products = await ProductModel.create({ productName: productName.toUpperCase(), hsnCode, cgstRate, sgstRate })
        Response.json(products)
    } catch (error) {
        return Response.json({ error: error.message })
    }
}
export async function PUT() {
    if (!dbCon()) return Response.json("DB not Connected")

    try {
        const id = request.params.id
        const body = request.json()

        if (!isValidObjectId(id)) {
            return Response.json({ error: "ID is invalid" })
        }

        if (typeof body.productName !== "string") {
            return Response.json({ error: "Name must be in type of string" })
        }

        if (isNaN(body.hsnCode)) {
            return Response.json({ error: "Hsn Code must be a type of number!" })
        }

        if ((isNaN(body.cgstRate)) || (isNaN(body.sgstRate))) {
            return Response.json({ error: "Name must be in type of string" })
        }

        const updateData = await ProductModel.findByIdAndUpdate(id, body)

        if (!updateData) {
            return Response.json({ error: "Product not found" })
        }
        Response.json(updateData)
    } catch (error) {
        return Response.json({ error: error.message })
    }
}
export async function DELETE() {
    if (!dbCon()) return Response.json("DB not Connected")

    try {
        const id = request.params.id
        if (!isValidObjectId(id)) {

            return Response.json({ error: "This Product does not exist." })
        }
        const deleteData = await ProductModel.findByIdAndDelete(id)
        if (!deleteData) {
            return Response.json({ error: "Product not found" })
        }
        Response.json(deleteData)
    } catch (error) {
        return Response.json({ error: error.message })
    }
}
