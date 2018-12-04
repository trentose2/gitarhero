const db = require('./db');

const postTasks = (req, res) => {
    let task = {
        type: req.body.type,
        topic: req.body.topic,
        question: req.body.question,
        choices: req.body.choices,
        answers: req.body.answers
    };

    if (!task.type || typeof task.type != 'string' || (task.type != 'Open question' && task.type != "Multiple choice")) {
        res.status(400).json({ error: 'The field "type" is mandatory and must be a non-empty string with value "Open question" or "Multiple choice"' });
        return;
    }

    if (!task.topic || typeof task.topic != 'string') {
        res.status(400).json({ error: 'The field "topic" must is mandatory and must be a non-empty string' });
        return;
    }

    if (!task.question || typeof task.question != 'string') {
        res.status(400).json({ error: 'The field "question" is mandatory and must be a non-empty string' });
        return;
    }

    if (task.type == 'Open question' && task.choices) {
        res.status(400).json({ error: 'If the field "type" has value "Open question", then the field "choices" is not allowed' });
        return;
    }

    if (task.type == 'Multiple choice' && !task.choices) {
        res.status(400).json({ error: 'If the field "type" has value "Multiple choice", then it is mandatory to have the field "choices"' });
        return;
    }

    if (task.type == 'Multiple choice' && !Array.isArray(task.choices)) {
        res.status(400).json({ error: 'If the field "type" has value "Multiple choice", then the field field "choices" is mandatory and must be an array' });
        return;
    }

    if (task.type == 'Multiple choice') {
        for (let item of task.choices) {
            if (typeof item != 'string') {
                res.status(400).json({ error: 'If the field "type" has value "Multiple choice", then the field "choices" is mandatory and must be an array of strings' });
                return;
            }
        }
    }

    if (!task.answers) {
        res.status(400).json({ error: 'The field "answers" is mandatory' });
        return;
    }

    if (task.type == 'Open question' && typeof task.answers != 'string') {
        res.status(400).json({ error: 'If the field "type" has value "Open question", then the field "answers" is mandatory and must be a non-empty string' });
        return;
    }

    if (task.type == 'Multiple choice' && !Array.isArray(task.answers)) {
        res.status(400).json({ error: 'If the field "type" has value "Multiple choice", then the field "answers" is mandatory and must be an array' });
        return;
    }

    if (task.type == 'Multiple choice') {
        for (let i of task.answers) {
            if (!Number.isInteger(i)) {
                res.status(400).json({ error: 'The values contained in the field "answers" must be integers' });
                return;
            }
        }
    }
    
    if (task.type == 'Multiple choice') {
        for (let i of task.answers) {
            if (i > task.choices.length -1) {
                res.status(400).json({ error: 'The values contained in the field "answers" must represent valid indexes for the array of the field "choices"' });
                return;
            }
        }
    }

    db.tasks.add(task);

    res.status(201).json(task);
};

const getTask = (req, res) => {
    let taskId = parseInt(req.params.id, 10);

    if (!isNaN(taskId) && taskId > 0) {
        let task = db.tasks.findOneWithId(taskId);

        if (task) {
            res.status(200).json(task);
        }
        else {
            res.status(404).json({ error: `No task with id ${taskId} was found` });
        }
    }
    else {
        res.status(400).json({ error: 'Invalid task ID' });
    }
};

const deleteTask = (req, res) => {
    let taskId = parseInt(req.params.id, 10);

    if (!isNaN(taskId) && taskId > 0) {
        let existed = db.tasks.removeWithId(taskId);

        if (existed) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: `No task with id ${taskId} was found` });
        }
    }
    else {
        res.status(400).json({ error: 'Invalid task ID' });
    }
};

module.exports = {
    getTask,
    postTasks,
    deleteTask
};
