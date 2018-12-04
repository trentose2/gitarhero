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

    for (let taskId of assignment.tasks) {
        let t = db.tasks.findOneWithId(taskId);

        if (!t) {
            return res.status(400).json({ error: `The task with id ${taskId} was not found` });
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

    for (let groupId of assignment.groups) {
        let g = db.groups.findOneWithId(groupId);

        if (!g) {
            return res.status(400).json({ error: `The group with id ${groupId} was not found` });
        }
    }

    if (!assignment.deadline || typeof assignment.deadline != 'string') {
        res.status(400).json({ error: 'The field "deadline" must be a non-empty string' });
        return;
    }

    assignment.deadline = new Date(assignment.deadline);
    
    if (isNaN(assignment.deadline.getTime())) {
        res.status(400).json({ error: 'The field "deadline" must be a ISO 8601 datetime string' });
        return;
    }

    if (assignment.status != 'open' && assignment.status != 'closed') {
        res.status(400).json({ error: 'The field "status" must be one of the two values: "open" or "closed"' });
        return;
    }

    db.assignments.insert(assignment);

    res.status(201).json(assignment);
};

const getAssignments = (req, res) => {
    if (typeof req.query.userId != 'undefined') {
        let userId = parseInt(req.query.userId, 10);

        if (!isNaN(userId) && userId > 0) {
            let assignments = db.assignments.findWithUserId(userId);
            res.status(200).json(assignments);
        }
        else {
            res.status(400).json({ error: 'The userId query parameter must be a positive integer' });
        }
    }
    else {
        let assignments = db.assignments.find();
        res.status(200).json(assignments);
    }
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

const getAssignmentTasks = (req, res) => {
    let assignmentId = parseInt(req.params.id, 10);

    if (!isNaN(assignmentId) && assignmentId > 0) {
        let assignment = db.assignments.findOneWithId(assignmentId);

        if (assignment) {
            let tasks = db.assignments.findTasksWithAssignment(assignment);

            res.status(200).json(tasks);
        }
        else {
            res.status(404).json({ error: `No assignment with id ${assignmentId} was found` });
        }
    }
    else {
        res.status(400).json({ error: 'Invalid assignment ID' });
    }
};

const deleteAssignment = (req, res) => {
    let assignmentId = parseInt(req.params.id, 10);

    if (!isNaN(assignmentId) && assignmentId > 0) {
        let existed = db.assignments.removeWithId(assignmentId);

        if (existed) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: `No assignment with id ${assignmentId} was found` });
        }
    }
    else {
        res.status(400).json({ error: 'Invalid assignment ID' });
    }
};

const putAssignment = (req, res) => {
    let assignmentId = parseInt(req.params.id, 10);

    if (!isNaN(assignmentId) && assignmentId > 0) {
        let assignment = db.assignments.findOneWithId(assignmentId);

        if (!assignment) {
            res.status(404).json({ error: `No assignment with id ${assignmentId} was found` });
            return;
        }

        if (typeof req.body.name != 'undefined') {
            if (!req.body.name || typeof req.body.name != 'string') {
                res.status(400).json({ error: 'The field "name" must be a non-empty string' });
                return;
            }

            assignment.name = req.body.name;
        }
        
        if (typeof req.body.tasks != 'undefined') {
            if (!Array.isArray(req.body.tasks)) {
                res.status(400).json({ error: 'The field "tasks" must be an array' });
                return;
            }

            for (let t of req.body.tasks) {
                if (!Number.isInteger(t)) {
                    res.status(400).json({ error: 'The field "tasks" must contain only integers' });
                    return;
                }
            }

            for (let taskId of req.body.tasks) {
                let t = db.tasks.findOneWithId(taskId);

                if (!t) {
                    return res.status(400).json({ error: `The task with id ${taskId} was not found` });
                }
            }

            assignment.tasks = req.body.tasks;
        }

        if (typeof req.body.groups != 'undefined') {
            if (!Array.isArray(req.body.groups)) {
                res.status(400).json({ error: 'The field "groups" must be an array' });
                return;
            }

            for (let t of req.body.groups) {
                if (!Number.isInteger(t)) {
                    res.status(400).json({ error: 'The field "groups" must contain only integers' });
                    return;
                }
            }

            for (let groupId of req.body.groups) {
                let g = db.groups.findOneWithId(groupId);

                if (!g) {
                    return res.status(400).json({ error: `The group with id ${groupId} was not found` });
                }
            }

            assignment.groups = req.body.groups;
        }

        if (typeof req.body.deadline != 'undefined') {
            if (!req.body.deadline || typeof req.body.deadline != 'string') {
                res.status(400).json({ error: 'The field "deadline" must be a non-empty string' });
                return;
            }

            if (isNaN(new Date(req.body.deadline).getTime())) {
                res.status(400).json({ error: 'The field "deadline" must be a ISO 8601 datetime string' });
                return;
            }

            assignment.deadline = new Date(req.body.deadline);
        }
        
        if (typeof req.body.status != 'undefined') {
            if (req.body.status != 'open' && req.body.status != 'closed') {
                res.status(400).json({ error: 'The field "status" must be one of the two values: "open" or "closed"' });
                return;
            }

            assignment.status = req.body.status;
        }
        
        res.status(200).json(assignment);
    }
    else {
        res.status(400).json({ error: 'Invalid assignment ID' });
    }
};

module.exports = {
    postAssignments,
    getAssignments,
    getAssignment,
    getAssignmentTasks,
    deleteAssignment,
    putAssignment
};
