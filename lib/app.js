const express = require('express');
const app = express();

app.use(express.json());

/* Moduli per la gestione delle richieste alle API */
const answers = require('./answers.js')
const assignments = require('./assignments.js');
const tasks = require('./tasks.js');
const marks = require('./marks.js');
const users = require('./users.js');


app.post('/api/v1/answers', answers.postAnswers);
app.get('/api/v1/assignments', assignments.getAssignments);
app.post('/api/v1/assignments', assignments.postAssignments);
app.post('/api/v1/tasks', tasks.postTasks);
app.post('/api/v1/marks', marks.postMarks);
app.post('/api/v1/users', users.postUsers);

/* Default 404 handler */
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});
module.exports = app;