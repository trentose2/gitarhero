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

    db.assignments.insert(assignment);

    res.status(201).json(assignment);
};

const getAssignments = (req, res) => {
    let userId = parseInt(req.query.userId, 10);

    let assignments;
    if (!isNaN(userId) && userId > 0) {
        assignments = db.assignments.findWithUserId(+userId);
    }
    else {
        assignments = db.assignments.find();
    }

    res.status(200).json(assignments);
};

const getAssignment = (req, res) => {
    let assignmentId = parseInt(req.params.id, 10);

    if (!isNaN(assignmentId) && assignmentId > 0) {
        let assignment = db.assignments.findOneWithId(assignmentId);

        if (assignment) {
            res.status(200).json(assignment);
        }
        else {
            res.status(404).json({ error: `No assignment with id ${assignmentId} was found` });
        }
    }
    else {
        res.status(400).json({ error: 'Invalid assignment ID' });
    }
};

module.exports = {
    postAssignments,
    getAssignments,
    getAssignment
};
