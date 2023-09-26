import mongoose from "mongoose";
import { Book } from "../models/bookModel";
import  express  from "express";

const route = express.Router();

// GET ALL BOOKS
route.get('/',async (req,res)=>{
    try{
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch(err)
    {
        console.log(err.message + "ABv");
        res.status(500).send({message:err.message});
    }
});


// GET SINGLE BOOKS
route.get('/:id',async (req,res)=>{
    try{
        const { id } = req.params;
        const book = await Book.findById(id);

        return res.status(200).json(book);
    }
    catch(err)
    {
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
});
// Update the book
route.put('/:id',async (req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear)
        {
            return res.status(400).send({message: 'SEND ALL REQUIRED THINGS PROPERLY'});
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id,req.body);
        if(!result)
        {
            return res.status(404).send({message: 'BOOK NOT FOUND'});
        }
        return res.status(200).send({message: 'BOOK UPDATED'});
        
    }
    catch(err)
    {
        console.log(err.message);
        res.status(500).send({message: err.message});
    
    }
});
// delete object 
route.delete("/:id",async (req,res)=>{
    try{
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result)
        {
            return res.status(404).send({message: 'BOOK NOT FOUND'});
        }
        return res.status(200).send({message: 'BOOK DELETED'});
        
    }
    catch(err)
    {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});


// ROUTE TO SAVE A BOOK (POST METHOD)
route.post('/', async (req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear)
        {
            return res.status(400).send({message: 'SEND ALL REQUIRED THINGS PROPERLY'});
        }
        //CREATE BOOK OBJECT
        const newBook ={
        title:req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
        };
        // CREATE BOOK PROPERLY
        const book = await Book.create(newBook);
        return res.status(201).send(book);

    }
    catch(err)
    {
    console.log(err);
    res.status(500).send({message: err.message});
    }
})
 
export default route;