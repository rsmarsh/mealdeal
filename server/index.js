require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
const routes = require('./routes');

// enable CORS requests from whitelisted origins
const whitelist = ['http://localhost:3000'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Origin disallowed by CORS'));
        }
    }
};

// set up CORS middleware to intercept unauthorised cors requests
app.use(cors(corsOptions));

// provides access to POST request  JSON data via the req.body property
app.use(bodyParser.json());

// forward all requests through the routes as middleware 
app.use('/api', routes);


app.listen(port, () => console.log(`server listening on port ${port}`));