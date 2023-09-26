import  express, { request, response }  from "express"
import {PORT,mongoDBURL} from "./config.js" 
import mongoose from "mongoose"
import { Book } from "./models/bookModel.js"
import { User } from "./models/User.js"
import cors from "cors"
const app = express()

app.use(express.json());


app.use(express.static('../Frontend'))
// Middleware
app.use(cors());

/*
    {
        origin: "http://localhost:" + PORT,
        methods: ['GET','PUT','DELETE','POST'],
        allowedHeaders: ['Content-Type'],
    }
*/
//app.use("./", router)

// GET FUNCTION
app.get('/',(req,res)=>{
    console.log("GET IS AT /");
    return res.status(234).send("WELCOME TO WOIX");
})
// GET METHODS
//  Get users
app.get('/user',async (req,res)=>{
    try{
        const user = await User.find({});

        return res.status(200).send(user);
    }
    catch(err)
    {
        console.log(err.message + "ABv");
        res.status(500).send({message:err.message});
    }
});
// Add user


// GET ALL BOOKS
app.get('/books',async (req,res)=>{
    try{
        const books = await Book.find({});

        return res.status(200).send(books);
    }
    catch(err)
    {
        console.log(err.message + "ABv");
        res.status(500).send({message:err.message});
    }
});
// Create user

// ROUTE TO SAVE A BOOK (POST METHOD)
app.post('/user', async (req,res)=>{
    try{
        if(!req.body.userName || !req.body.userPassword )
        {
            return res.status(400).send({message: 'SEND ALL REQUIRED THINGS PROPERLY'});
        }
        //CREATE BOOK OBJECT
        const newUser ={
        userName:req.body.userName,
        userPassword: req.body.userPassword
        };
        // CREATE BOOK PROPERLY
        const user = await User.create(newUser);
        return res.status(201).send(user);

    }
    catch(err)
    {
    console.log(err);
    res.status(500).send({message: err.message});
    }
})

 



// GET SINGLE BOOKS
app.get('/books/:id',async (req,res)=>{
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
app.put('/books/:id',async (req,res)=>{
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
app.delete("/books/:id",async (req,res)=>{
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
app.post('/books', async (req,res)=>{
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

 
// CONNECT TO DATA BASE
mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("APP CONNECTED TO DATABASE");
// LISTEN FUNCTION
    app.listen(PORT,()=>{
        console.log("path of file is http://localhost:" + PORT)
    })
})
.catch((error)=>{
    console.log(error + "ABC");
})
