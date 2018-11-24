const express = require('express');
const app = express();

const assignments = require('./assignments.js');

app.use(express.json());

app.post('/api/v1/assignments', assignments.postAssignments);

// Default 404 handler
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

module.exports = app;
