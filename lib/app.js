const express = require('express');
const app = express();

const tasks = require('./tasks.js');

app.use(express.json());

app.post('/api/v1/tasks', tasks.postTasks);

// Default 404 handler
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found', status: 404 });
});

module.exports = app;