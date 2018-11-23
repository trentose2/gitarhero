const storage = {
    users: [],
    asignments: [],
    tasks: []
    // TODO: add other arrays
};

const users = {
    add(user) {
        // TODO: add user
    }
};

const tasks = {
    add(assignment) {
        // Generate a new ID
        let ids = storage.tasks.map(a => a.id);

        let maxId = 0;
        if (ids.length) {
            maxId = Math.max(...ids);
        }
        
        assignment.id = maxId + 1;
        storage.tasks.push(assignment);
    }
};

module.exports = {
    users,
    tasks
};