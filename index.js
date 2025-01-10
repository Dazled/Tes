const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// Import Router
const apiRouter = require('./api');

// Enable CORS for all routes
app.use(cors({
  origin: '*', // Allow all origins
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.use('/api', apiRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Definisikan Router pada path "/api"


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
