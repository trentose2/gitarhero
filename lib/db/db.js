const storage = {
    users: [],
    asignments: [],
    tasks: [],
    marks: []
    // TODO: add other arrays
};

const users = {
    add(user) {
        // TODO: add user
    }
};

const marks = {
    add(assignment) {
        // Generate a new ID
        let ids = storage.marks.map(a => a.id);

        let maxId = 0;
        if (ids.length) {
            maxId = Math.max(...ids);
        }
        
        assignment.id = maxId + 1;
        storage.marks.push(assignment);
    }
};

module.exports = {
    users,
    marks
};