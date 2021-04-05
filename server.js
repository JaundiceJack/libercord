// Import Libraries
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Instance the express app
const app = express();

// Body parser middleware
app.use(express.json());

// Set up cross origin resource sharing
var whitelist = ['184.166.89.30']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) { callback(null, true) }
    else { callback(new Error('Not allowed by CORS')) }
  }
}
app.use(cors(corsOptions));


// Get the mongo connection key
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.log(err));

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/assets', require('./routes/api/assets'));
app.use('/api/incomes', require('./routes/api/incomes'));
app.use('/api/expenses', require('./routes/api/expenses'));
app.use('/api/liabilities', require('./routes/api/liabilities'));

// Define a route to ensure the server is functioning
app.get('/ping', (req, res) => { return res.send('pong'); });

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
