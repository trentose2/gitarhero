const storage = {
    users: [],
    assignments: [],
    tasks: []
    // TODO: add other arrays
};

const users = {
    add(user) {
        // TODO: add user
    }
};

const assignments = {
    add(assignment) {
        storage.assignments.push(assignment);
    }
};

module.exports = {
    users,
    assignments
};
