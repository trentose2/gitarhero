const db = require('./db');

const postMarks = (req, res) => {
    let mark = {
        mark: req.body.mark,
        text: req.body.text
    };

    if (!mark.mark || typeof mark.mark != 'number') {
        res.status(400).json({ error: 'Field "mark" must be a number' });
        return;
    }

    if (mark.mark < 0) {
        res.status(400).json({ error: 'Field "mark" must be a number greater than 0' });
        return;
    }

    /* Qui assumo che il field "text" possa anche non essere compilato */
    if (mark.text && typeof mark.text != 'string') {
        res.status(400).json({ error: 'Field "text" must be a string' });
        return;
    }

    /* "text" senza "mark" non ha alcun senso */
    if (mark.text && !mark.mark) {
        res.status(400).json({ error: 'Field "mark" is mandatory is field "text" is present' });
        return;
    }

    db.marks.add(mark);

    res.status(201).json(mark);
};

const getMarks = (req, res) => {
    let userId = req.query.userId;
    let assignmentId = req.query.assignmentId;
    
    let mark = { userId, assignmentId };

    /* Non ci possono essere 0 parametri */
    if (!userId && !assignmentId) {
        res.status(400).json({ error: 'Invaid request: parameter "userId" must be specified' });
        return;
    }

    /* "userId" è il parametro mandatorio */
    if (!userId) {
        res.status(400).json({ error: 'Parameter "userId" is mandatory' });
        return;
    }

    if (isNaN(userId)) {
        res.status(400).json({ error: 'Parameter "userId" must be a number' });
        return;
    }

    if (userId <= 0) {
        res.status(400).json({ error: 'Parameter "userId" must be a number greater than 0' });
        return;
    }

    /* Non posso avere "assignmentId" senza un rispettivo "userId" */
    if (!userId && assignmentId) {
        res.status(400).json({ error: 'Parameter "userId" is mandatory if field "assignmentId" is sent in the request' });
        return;
    }

    if (assignmentId && isNaN(assignmentId)) {
        res.status(400).json({ error: 'Parameter "assignmentId" must be a number' });
        return;
    }

    if (assignmentId && assignmentId <= 0) {
        res.status(400).json({ error: 'Parameter "assignmentId" must be a number greater than 0' });
        return;
    }
    let result = db.marks.get(mark);
    res.status(200).json(result);
};

module.exports = {
    postMarks,
    getMarks
};
