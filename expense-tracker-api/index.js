const express = require('express');
const app = express();
const transactionRoutes = require('./routes/transactionRoutes');
const summaryRoutes = require('./routes/summaryRoutes');
const errorHandler = require('./middleware/errorHandler');

const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// API Routes
app.use('/transactions', transactionRoutes);
app.use('/summary', summaryRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
