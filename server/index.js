require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => res.send('mealdeal backend api'));


app.listen(port, () => console.log(`server listening on port ${port}`));