import mongoose from "mongoose";

let dbFlag = false
const dbCon = async () => {
    try {
        if (!dbFlag) {
            await mongoose.connect(process.env.MONGODB_URI)
            dbFlag = true
            return dbFlag
        }
    } catch (error) {
        console.log("MongoDB not connected", error);
    }
};
export default dbCon;