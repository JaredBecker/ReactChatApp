const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const user_routes = require('./routes/userRoutes');

// Initializing the application
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', user_routes);
app.use('/api/auth', user_routes);

/**
 * Connects to the MongoDB
 * useUnifiedTopology -> MongoDB driver's new connection management engine
 */
mongoose
    .connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DB Connection Successful');
    })
    .catch((err) => {
        console.log(err.message);
    })

// Start the server on the port setup in our env file
const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on PORT: ${process.env.PORT}`);
})