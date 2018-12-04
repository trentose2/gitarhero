const express = require('express');
const app = express();

app.use(express.json());

/* Moduli per la gestione delle richieste alle API */
const answers = require('./answers.js');
const assignments = require('./assignments.js');
const tasks = require('./tasks.js');
const marks = require('./marks.js');
const users = require('./users.js');
const groups = require('./groups.js');


app.get('/api/v1/tasks/:id', tasks.getTask);
app.post('/api/v1/tasks', tasks.postTasks);
app.delete('/api/v1/tasks/:id', tasks.deleteTask);

app.delete('/api/v1/answers/:id', answers.deleteAnswer);
app.get('/api/v1/answers/:id', answers.getAnswer);
app.get('/api/v1/answers/:id/reviews', answers.getAnswersReview);
app.post('/api/v1/answers', answers.postAnswers);
app.post('/api/v1/answers/:id/reviews', answers.postAnswersReview);

app.post('/api/v1/assignments', assignments.postAssignments);
app.get('/api/v1/assignments', assignments.getAssignments);
app.get('/api/v1/assignments/:id', assignments.getAssignment);
app.put('/api/v1/assignments/:id', assignments.putAssignment);
app.delete('/api/v1/assignments/:id', assignments.deleteAssignment);
app.get('/api/v1/assignments/:id/tasks', assignments.getAssignmentTasks);

app.post('/api/v1/marks', marks.postMarks);
app.get('/api/v1/marks', marks.getMarks);

app.get('/api/v1/users/:id', users.getUsers);
app.post('/api/v1/users', users.postUsers);

app.get('/api/v1/groups', groups.getGroups);
app.post('/api/v1/groups', groups.postGroups);
app.put('/api/v1/groups/:id', groups.putGroups);
app.get('/api/v1/groups/:id/members', groups.getGroupsMembers);

/* Default 404 handler */
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

module.exports = app;
