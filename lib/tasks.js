const db = require('./db');

const postTasks = (req, res) => {
    let task = {
        type: req.body.type,
        topic: req.body.topic,
        question: req.body.question,
        choices: req.body.choices,
        answer: req.body.answer
    };
    
    if (!task.type || typeof task.type != 'string' || task.type != 'Open question' || task.type != "Multiple choice") {
        res.status(400).json({ error: 'The field "type" must be a non-empty string. Possible types: "Open question", "Multiple choice' });
        return;
    }

    if (!task.topic || typeof task.topic != 'string')) {
        res.status(400).json({ error: 'The field "topic" must be a string.  });
    }

    if (!task.question || typeof task.question != 'string') {
        res.status(400).json({ error: 'The field "question" is mandatory' });
    }

    if (task.type == 'Open question' && task.choices) {
        res.status(400).json({ error: 'A task with type "Open question" does not allow field "choices" to be defined' });
    }

    if (!task.answer) {
        res.status(400).json({ error: 'The field "answer" is mandatory.' });
    }

    if (task.type == 'Open question' && typeof task.answer != 'string') {
        res.status(400).json({ error: 'If task type is "Open question", then field "answer" must have type "string"' });
    }

    if (task.type == 'Multiple choice' && !Array.isArray(task.question)) {
        res.status(400).json({ error: 'If task type is "Open question", then field "answer" must be an array' });
    }

    if (task.type == 'Multiple choice') {
        let wrongItems = [];
        for (let item of task.choices) {
            if (typeof item != 'string') {
                wrongItems.push(typeof item);
            }
        }
        if (wrongItems.length > 0) {
            let message = 'The field "choices" must be an array of strings.\nFound: ';
            for (let i = 0; i<wrongItems.length-1; i++) {
                message += wrongItems[i] += ', '
            }
            message += wrongItems[wrongItems.length] += '.';
            res.status(400).json({ error: message });
        }
    }

    db.tasks.add(task);

    res.status(201).json(task);
};

module.exports = {
    postTasks
};
