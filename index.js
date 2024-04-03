const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

// use .env variables
dotenv.config();

// destructure the cors options from .env to make an array of all domains
const CORS_OPTIONS = process.env.CORS_OPTIONS;
let corsOrigins = [];
if (CORS_OPTIONS) {
    corsOrigins = CORS_OPTIONS.split(',');
}

// allow cors
app.use(cors({
    origin: corsOrigins,
    optionsSuccessStatus: 200
}));

// make public folder static to server static files
app.use(express.static('public'));

// parse the request body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.status(200).send("Server is running!");
});

// make an express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});