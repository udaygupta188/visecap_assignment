const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const connectDB = require("./config/db");
const routes = require('./routes/index');

//Express Server Setup
const app = express();
const port = process.env.PORT || 5111;
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

//Express Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Connection URL
const DB = process.env.MONGO_URI;
connectDB(DB);

//Server status endpoint
app.get('/', (req, res) => {
    res.send('Server is Up!');
});

app.get('/test', (req, res) => {
    res.json({message:'Test File'});
});

// Routes
app.use("/api", routes);

app.listen(port, () => {
    console.log(`Node/Express Server is Up......\nPort: localhost:${port}`);
});