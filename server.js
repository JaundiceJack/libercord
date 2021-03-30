// Import Libraries
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
// Import Routes
const users = require('./routes/api/users');
const assets = require('./routes/api/assets');
const incomes = require('./routes/api/incomes');
const expenses = require('./routes/api/expenses');
const liabilities = require('./routes/api/liabilities');

// Instance the express app
const app = express();

// Body parser middleware
app.use(express.json());

// DB Config
const db = require('./config/keys.js').mongoURI

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.log(err));

// Define Routes
app.use('/api/users', users);
app.use('/api/assets', assets);
app.use('/api/incomes', incomes);
app.use('/api/expenses', expenses);
app.use('/api/liabilities', liabilities);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

// Start the app on the env port or port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
