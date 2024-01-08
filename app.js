const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes')
const {MONGO_DATABASE_URL,PORT}  = require('./constants')

const app = express();
app.use(bodyParser.json());
// Connect to MongoDB
mongoose.connect(MONGO_DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

console.log("PORT here ",PORT)
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});