const db = require('./db');

const postAssignments = (req, res) => {
    let assignment = {
        name: req.body.name,
        tasks: req.body.tasks,
        groups: req.body.groups,
        deadline: req.body.deadline,
        status: req.body.status
    };

    // TODO: generate ID
    // TODO: check missing fields
    // TODO: check validity of fields
    // TODO: check that tasks and groups exist

    db.assignments.add(assignment);

    res.status(201).json(assignment);
};

module.exports = {
    postAssignments
};
