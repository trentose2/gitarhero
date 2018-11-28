const db = require('./db');

const postAssignments = (req, res) => {
    let assignment = {
        name: req.body.name,
        tasks: req.body.tasks,
        groups: req.body.groups,
        deadline: req.body.deadline,
        status: req.body.status
    };

    if (!assignment.name || typeof assignment.name != 'string') {
        res.status(400).json({ error: 'The field "name" must be a non-empty string' });
        return;
    }

    if (!assignment.tasks || !Array.isArray(assignment.tasks)) {
        res.status(400).json({ error: 'The field "tasks" must be an array' });
        return;
    }

    for (let t of assignment.tasks) {
        if (!Number.isInteger(t)) {
            res.status(400).json({ error: 'The field "tasks" must contain only integers' });
            return;
        }
    }

    if (!assignment.groups || !Array.isArray(assignment.groups)) {
        res.status(400).json({ error: 'The field "groups" must be an array' });
        return;
    }

    for (let t of assignment.groups) {
        if (!Number.isInteger(t)) {
            res.status(400).json({ error: 'The field "groups" must contain only integers' });
            return;
        }
    }

    if (!assignment.deadline || typeof assignment.name != 'string') {
        res.status(400).json({ error: 'The field "deadline" must be a non-empty string' });
        return;
    }

    assignment.deadline = new Date(assignment.deadline);
    
    if (isNaN(assignment.deadline.getTime())) {
        res.status(400).json({ error: 'The field "deadline" must be a ISO 8601 datetime string' });
        return;
    }

    if (!assignment.status || typeof assignment.status != 'string'
        || (assignment.status != 'open' && assignment.status != 'closed')) {
        res.status(400).json({ error: 'The field "status" must be one of the two values: "open" or "closed"' });
        return;
    }
    
    // TODO: check that tasks and groups exist

    db.assignments.add(assignment);

    res.status(201).json(assignment);
};

const getAssignments = (req, res) => {

    /* Todo: implementare i controlli, come fatto per postAssignments */

    let userId = req.query.userId;

    let assignments;

    if (userId) {
        assignments = db.assignments.getByUserId(userId);
    }
    else {
        assignments = db.assignments.getBulk();
    }

    res.status(200).json(assignments);
};

module.exports = {
    postAssignments,
    getAssignments
};