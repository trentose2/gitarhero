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
            if (i > task.choices.length - 1) {
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

const putTask = (req, res) => {
    let taskId = Number.parseInt(req.params.id, 10);

    let task;
    
    if (!isNaN(taskId) && taskId > 0) {
        task = db.tasks.findOneWithId(taskId);
        if (!task) {
            res.status(404).json({ error: `No task with id ${taskId} was found` });
            return;
        }
    }
    else {
        res.status(400).json({ error: 'Invalid task ID' });
    }
    
    //Controlliamo che non si modifichi il tipo del task
    if (typeof req.body.type != 'undefined') {
        if (!req.body.type || typeof req.body.type != 'string') {
            res.status(400).json({ error: 'The field "type" must be a non-empty string' });
            return;
        }
        if (req.body.type != task.type) {
            res.status(400).json({ error: 'Once that a task has been created, its type cannot be modified' });
            return;
        }
    }

    //La modifica del topic è consentita
    if (typeof req.body.topic != 'undefined') {
        if (!req.body.topic || typeof req.body.topic != 'string') {
            res.status(400).json({ error: 'The field "topic" must be a non-empty string' });
            return;
        }
        task.topic = req.body.topic;
    }

    //La modifica della domanda è consentita
    if (typeof req.body.question != 'undefined') {
        if (!req.body.question || typeof req.body.question != 'string') {
            res.status(400).json({ error: 'The field "question" must be a non-empty string' });
            return;
        }
        task.question = req.body.question;
    }
    
    //Se il tipo è "Open question", non vogliamo che venga inserito un campo "choices"
    if (task.type == 'Open question' && typeof req.body.choices != 'undefined') {
        //Salto il controllo "if(!req.body.choices)", in quanto qua è superfluo
        res.status(400).json({ error: 'If the type is "Open question", then the field "choices" is disallowed' });
        return;
    }
    
    //Se il tipo è "Open question", non vogliamo che il campo "answers" sia un array
    if (task.type == 'Open question' && typeof req.body.answers != 'undefined') {
        if (!req.body.answers || typeof req.body.answers != 'string') {
            res.status(400).json({ error: 'The field "answers" must be a string' });
            return;
        }
    }
    //Se il tipo del task è "Multiple choice", la modifica del campo "choices" è consentita
    if (task.type == 'Multiple choice' && typeof req.body.choices != 'undefined') {
        if (!req.body.choices || !Array.isArray(req.body.choices)) {
            res.status(400).json({ error: 'The field "choices" must be an array' });
            return;
        }
        for (let c of req.body.choices) {
            if (typeof c != 'string') {
                res.status(400).json({ error: 'The values in the array of field "choices" must be strings' });
                return;
            }
        }
        task.choices = req.body.choices;
    }
    
    //Se il tipo del task è "Multiple choice", la modifica del campo "answers" è consentita
    if (task.type == 'Multiple choice' && typeof req.body.answers != 'undefined') {
        if (!req.body.answers || !Array.isArray(req.body.answers)) {
            res.status(400).json({ error: 'The field "answers" must be an array' });
            return;
        }
        for (let i of req.body.answers) {
            if (!Number.isInteger(i)) {
                res.status(400).json({ error: 'The values contained in the field "answers" must be integers' });
                return;
            }
        }
        for (let i of req.body.answers) {
            if (i > task.choices.length - 1) {
                res.status(400).json({ error: 'The values contained in the field "answers" must represent valid indexes for the array of the field "choices"' });
                return;
            }
        }
        task.answers = req.body.answers;
    }
    if (task.type == 'Open question' && typeof req.body.answers != 'undefined') {
        if (!req.body.answers || typeof req.body.answers != 'string') {
            res.status(400).json({ error: 'The field "answers" must be an array' });
            return;
        }
        task.answers = req.body.answers;
    }
    
    res.status(200).json(task);
}


module.exports = {
    getTask,
    postTasks,
    deleteTask,
    putTask
};
