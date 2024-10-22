import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); //load environment variable from .env file

const app = express();
const port = process.env.PORT || 3000;

//middleware to handle JSON
app.use(express.json());


//simple get req
app.get('/', (req, res, next)=>{
    res.send('<h1>hello world</h1>')
    
})

app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
    
})
