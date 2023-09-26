import mongoose from "mongoose";
// SCHEMA
const bookSchema = mongoose.Schema(
    {
        title: {
            type : String,
            required : true, 
        },
        author: {
            type : String,
            required : true, 
        },
        publishYear: {
            type : String,
            required : true, 
        },
    },
    {
        timestamps: true,
    }
);
// MODEL
export const Book = mongoose.model('book',bookSchema); 

