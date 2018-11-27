const db = require('./db');

const postAnswers = (req, res) => {
    let ans = {
        userId : req.body.userId,
        assignmentId : req.body.assignmentId,
        taskId : req.body.taskId,
        answer : req.body.answer
    };

    if (!ans.userId || !Number.isInteger(ans.userId)) {
        res.status(400).json({ error: 'The field "userId" must be an integer' });
        return;
    }

    if (ans.userId && ans.userId < 0) {
        res.status(400).json({ error: 'The field "userId" must have a value greater than or equal to zero' });
        return;
    }

    if (!ans.assignmentId || !Number.isInteger(ans.assignmentId)) {
        res.status(400).json({ error: 'The field "assignmentId" must be an integer' });
        return;
    }

    if (ans.assignmentId && ans.assignmentId < 0) {
        res.status(400).json({ error: 'The field "assignmentId" must have a value greater than or equal to zero' });
        return;
    }

    if (!ans.taskId || !Number.isInteger(ans.taskId)) {
        res.status(400).json({ error: 'The field "taskId" must be an integer' });
        return;
    }

    if (ans.taskId && ans.taskId < 0) {
        res.status(400).json({ error: 'The field "taskId" must have a value greater than or equal to zero' });
        return;
    }

    if (!ans.answer || typeof ans.answer != 'string') {
        res.status(400).json({ error: 'The field "answer" must be a non-empty string' });
        return;
    }

    db.answers.add(ans);

    res.status(201).json(ans);
};

module.exports = {
    postAnswers
};