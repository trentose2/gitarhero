const db = require('./db');

const postAnswers = (req, res) => {
    let answers = {
        userId : req.body.userId,
        assignmentId : req.body.assignmentId,
        taskId : req.body.taskId,
        answer : req.body.answer
    };

    if (!answers.userId || !Number.isInteger(userId)) {
        res.status(400).json({ error: 'The field "userId" must be an integer' });
        return;
    }

    if (answer.userId && answer.userId < 0) {
        res.status(400).json({ error: 'The field "userId" must have a value greater than or equal to zero' });
        return;
    }

    if (!answers.assignmentId || !Number.isInteger(assignmentId)) {
        res.status(400).json({ error: 'The field "assignmentId" must be an integer' });
        return;
    }

    if (answer.assignmentId && answer.assignmentId < 0) {
        res.status(400).json({ error: 'The field "assignmentId" must have a value greater than or equal to zero' });
        return;
    }

    if (!answers.taskId || !Number.isInteger(taskId)) {
        res.status(400).json({ error: 'The field "taskId" must be an integer' });
        return;
    }

    if (answer.taskId && answer.taskId < 0) {
        res.status(400).json({ error: 'The field "taskId" must have a value greater than or equal to zero' });
        return;
    }

    if (!answers.answer || typeof answers.answer != 'string') {
        res.status(400).json({ error: 'The field "answer" must be a non-empty string' });
        return;
    }

    db.answers.add(answer);

    res.status(201).json(answer);
};

module.exports = {
    postAnswers
};