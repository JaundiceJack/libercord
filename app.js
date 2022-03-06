const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connect = require('./db/connection.js');
const { notFound, errorFound } = require('./middleware/errorMW.js')
dotenv.config();

// Instance the app server and use the internal body parser
const app = express();
app.use(express.json());

// Instance a mongoDB connection
connect();

// Set up cross origin resource sharing (for Heroku)
/*
if (process.env.NODE_ENV === 'production') {
  const whitelist = [];
  const corsOptions = {
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1) { callback(null, true) }
      else { callback(new Error(`${origin} not allowed by CORS`)) }
    }
  }
  app.use(cors(corsOptions));
}
*/

// Define Routes
app.use('/api/users', require('./routes/paths/users.js'));
app.use('/api/assets', require('./routes/paths/assets.js'));
app.use('/api/incomes', require('./routes/paths/incomes.js'));
app.use('/api/sources', require('./routes/paths/sources.js'));
app.use('/api/expenses', require('./routes/paths/expenses.js'));
app.use('/api/locations', require('./routes/paths/locations.js'));
app.use('/api/categories', require('./routes/paths/categories.js'));
app.use('/api/liabilities', require('./routes/paths/liabilities.js'));
// Define a route to ensure the server is functioning
app.get('/ping', (req, res) => { return res.send('pong'); });

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public/build'));
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'));
  });
};

// Error handling middleware
app.use(notFound);
app.use(errorFound);

// Start the server on the assigned port
const port = process.env.PORT || 5000;
app.listen(port, () => { console.log(`Server started on port ${port}`); });
