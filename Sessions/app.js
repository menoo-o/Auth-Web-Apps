import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
const MONGO_URI = 'mongodb+srv://khayalipullaoo:aD8kE8pfvE8Xr0gN@cluster0.f85zh.mongodb.net/Sessions-Cookie?retryWrites=true&w=majority&appName=Cluster0';

const port = process.env.PORT || 3000;
const app = express();

// Middleware for JSON
app.use(express.json());

// Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',  // Use a secret from environment variable
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: MONGO_URI, // Store sessions in MongoDB
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

app.get('/', (req, res) => {
    
    if(req.session.views){
        req.session.views++ ;
    } else{
        req.session.views = 1;
    }

    res.send(`<h1>You have visited this page ${req.session.views} times</h1>`);
});


app.listen(port, () => {
    console.log(`Server listening at Port ${port}`);
});


// Connect to MongoDB and start the server
mongoose.connect(MONGO_URI)
.then(() => {
    console.log('Connected to db');

})
.catch((error) => {
    console.error('Connection Failed:', error);
});
