const express = require('express');
const app = express();

app.use(express.json());

/* Moduli per la gestione delle richieste alle API */
const assignments = require('./assignments.js');
const tasks = require('./tasks.js');

app.post('/api/v1/assignments', assignments.postAssignments);
app.post('/api/v1/tasks', tasks.postTasks);

/* Default 404 handler */
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

module.exports = app;