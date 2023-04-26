import mongoose from "mongoose";

const dbConnection = async() => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI);
        if(connection) {
            console.log("connection established");
        }
       
    }catch(err) {
        console.log("Something went wrong in connecting database___");
        throw(err);
    }

} 

export default dbConnection;