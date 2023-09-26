import mongoose from "mongoose";
// SCHEMA
const userSchema = mongoose.Schema(
    {
        userName: {
            type : String,
            required : true, 
        },
        userPassword: {
            type : String,
            required : true, 
        },
    },
    {
        timestamps: true,
    }
);
// MODEL
export const User = mongoose.model('user',userSchema); 

