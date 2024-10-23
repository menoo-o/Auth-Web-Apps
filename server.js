import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// Middleware to handle JSON
app.use(express.json());

// Middleware to log date and time for every request
app.use(printDate);

function printDate(req, res, next){
    console.log('Time:', new Date().toISOString());  // ISO format for readable date-time
    next();
}

// Simple GET request
app.get('/', (req, res) => {
    res.send('<h1>hello world</h1>');
});

app.get('/users', (req, res) => {
    res.send('<h1>error 40444</h1>')
    
    throw new Error('BROKEN') // Express will catch this on its own.
  })

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
