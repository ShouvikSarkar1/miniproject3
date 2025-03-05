const express = require('express');
const app = express();
let dbConnect = require('./dbConnect');
let userRoutes = require('./routes/userRoutes');
let gigRoutes = require('./routes/gigRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Welcome to GigFinder MongoDB application" });
});

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/gigs', gigRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});