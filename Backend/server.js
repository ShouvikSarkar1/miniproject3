const express = require('express');
const app = express();
let dbConnect = require('./dbConnect');
let userRoutes = require('./routes/userRoutes');
let gigRoutes = require('./routes/gigRoutes');

require("dotenv").config();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Welcome to GigFinder MongoDB application" });
});

app.use('/api/users', userRoutes);
app.use('/api/gigs', gigRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});