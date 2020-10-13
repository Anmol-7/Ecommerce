const express = require('express');
const products=require('./data/products');

const app=express();

app.get('/api/products',(req,res)=>{
    res.json(products);
})
app.get('/api/product/:id',(req,res)=>{
    const p=products.find(p=>p._id===req.params.id)
    res.json(p);
})

app.listen(5000,console.log('server running'));