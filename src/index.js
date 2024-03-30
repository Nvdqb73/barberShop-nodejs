const express = require('express');
const cors = require('cors');
require('dotenv').config();

const route = require('./routes');

const app = express();

// cors
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }),
);

// Check data from client
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
route(app);

// init port
const PORT = process.env.PORT || 8686;
const listener = app.listen(PORT, () => {
    console.log('Server is running on the port ' + listener.address().port);
});
