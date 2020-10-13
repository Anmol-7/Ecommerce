import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';
import colors from 'colors';
import connectDB from './config/db.js';

dotenv.config()

connectDB()

const app=express();

app.get('/api/products',(req,res)=>{
    res.json(products);
})
app.get('/api/product/:id',(req,res)=>{
    const p=products.find(p=>p._id===req.params.id)
    res.json(p);
})
const PORT=process.env.PORT||5000

app.listen(PORT,console.log('server running'.yellow.bold));