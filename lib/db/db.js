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
        // Generate a new ID
        let ids = storage.assignments.map(a => a.id);

        let maxId = 0;
        if (ids.length) {
            maxId = Math.max(...ids);
        }
        
        assignment.id = maxId + 1;
        storage.assignments.push(assignment);
    }
};

module.exports = {
    users,
    assignments
};
