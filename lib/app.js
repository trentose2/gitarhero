const express = require('express');
const app = express();

const marks = require('./marks.js');

app.use(express.json());

app.post('/api/v1/marks', marks.postMarks);

// Default 404 handler
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found', status: 404 });
});

module.exports = app;