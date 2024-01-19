//import axios from 'axios'; // es6 version
//const axios = require('axios'); // common js syntax or node js syntax


const express = require('express');
require("./db");
const todoRoutes = require('./routes/todo');
const userRoutes = require('./routes/user');
// const profileRoutes = require('./routes/profile');

const PORT = process.env.PORT || 4041;

const app = express();

app.use(express.json());

app.use('/api/todo', todoRoutes);
app.use('/api/user', userRoutes);

app.use((error,req,res,next)=>{
    if(error){
        console.log('error ocurred', error);
        const message = error.message || "Something went wrong .Try again later.";
        const status = error.status || 500;
        return res.status(500).send(message)
    }
})

app.listen(PORT, () => {
    console.log(`server at http://localhost:${PORT}`);
})
