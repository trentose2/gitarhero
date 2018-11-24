const db = require('./db');

const postMarks = (req, res) => {
    let mark = {
        mark: req.body.mark,
        text: req.body.text,
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

module.exports = {
    postMarks
};