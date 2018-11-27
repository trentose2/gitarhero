const db = require('./db');

/* 
--- Explaination ---
TASK:
    - ha un TYPE; possibili: 'Open question', 'Multiple choice'
    - ha un TOPIC (tipo: string)
    - ha una QUESTION (tipo: string)
Se TYPE è 'Open question':
    - ha un campo ANSWER che rappresenta una POTENZIALE risposta corretta
Se TYPE è 'Multiple choice':
    - ha un campo CHOICES che rappresenta le riposte selezionabili (tipo: array of strings)
    - ha un campo ANSWERS che rappresenta gli indici delle risposte corrette (tipo: array of integers)
*/

const postTasks = (req, res) => {
    let task = {
        type: req.body.type,
        topic: req.body.topic,
        question: req.body.question,
        choices: req.body.choices,
        answer: req.body.answer
    };

    /* TYPE: deve essere 'Open question' o 'Multiple choice' */
    if (!task.type || typeof task.type != 'string' || (task.type != 'Open question' && task.type != "Multiple choice")) {
        res.status(400).json({ error: 'The field "type" must be a non-empty string, with values: "Open question" or "Multiple choice' });
        return;
    }

    /* TOPIC: deve essere una stringa */
    if (!task.topic || typeof task.topic != 'string') {
        res.status(400).json({ error: 'The field "topic" must be a string' });
        return;
    }

    /* QUESTION: deve essere una stringa */
    if (!task.question || typeof task.question != 'string') {
        res.status(400).json({ error: 'The field "question" is mandatory' });
        return;
    }

    /* Una domanda aperta non prevede l'esistenza del campo "choices" */
    if (task.type == 'Open question' && task.choices) {
        res.status(400).json({ error: 'Type "Open question" does not allow field "choices" to be defined' });
        return;
    }

    /* Una domanda a risposte multiple impone l'esistenza del campo "choices" */
    if (task.type == 'Multiple choice' && !task.choices) {
        res.status(400).json({ error: 'Type "Multiple choice" implies field "choices"' });
        return;
    }

    /* Una domanda a risposte multiple impone che il campo "choices" sia un array */
    if (task.type == 'Multiple choice' && !Array.isArray(task.choices)) {
        res.status(400).json({ error: 'Type "Multiple choice" implies field "choices" to be an array' });
        return;
    }

    /* Una domanda a risposte multiple impone che il campo "choices" sia un array di stringhe */
    if (task.type == 'Multiple choice') {
        for (let item of task.choices) {
            if (typeof item != 'string') {
                res.status(400).json({ error: 'Type "Multiple choice" implies "choices" to be an array of strings' });
                return;
            }
        }
    }

    /* Sia che la risposta sia aperta o a scelte multiple, deve essere presente un campo risposta */
    if (!task.answer) {
        res.status(400).json({ error: 'The field "answer" is mandatory' });
        return;
    }

    /* Una domanda aperta impone che il campo "answer" sia una stringa */
    if (task.type == 'Open question' && typeof task.answer != 'string') {
        res.status(400).json({ error: 'For type "Open question", field "answer" must be a string' });
        return;
    }

    /* Una domanda a risposte multiple impone che il campo "answers" sia un array */
    if (task.type == 'Multiple choice' && !Array.isArray(task.answers)) {
        res.status(400).json({ error: 'For type "Multiple choice", field "answer" must be an array' });
        return;
    }

    /* Una domanda a risposte multiple impone che il campo "answers" sia un array di interi*/
    if (task.type == 'Multiple choice') {
        for (let i of task.answers) {
            if (!Number.isInteger(i)) {
                res.status(400).json({ error: 'Values contained in field "answers" must be integers' });
                return;
            }
        }
    }
    
    /* Una domanda a risposte multiple impone che il campo "answers" contenga valori che rappresentino indici validi per l'array "choices" */
    if (task.type == 'Multiple choice') {
        for (let i of task.answers) {
            if (i > task.choices.length -1) {
                res.status(400).json({ error: 'Values contained in field "answers" must represent valid indexes for the "choices" array' });
                return;
            }
        }
    }

    db.tasks.add(task);

    res.status(201).json(task);
};

module.exports = {
    postTasks
};
