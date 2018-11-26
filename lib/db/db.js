const storage = {
    users: [],
    assignments: [],
    tasks: [],
    marks: []
    /* TODO: add other arrays */
};

const users = {
    add(user) {
        /* TODO: add user */
    }
};

const assignments = {
    add(assignment) {
        /* Generate a new ID */
        let ids = storage.assignments.map(a => a.id);

        let maxId = 0;
        if (ids.length) {
            maxId = Math.max(...ids);
        }
        
        assignment.id = maxId + 1;
        storage.assignments.push(assignment);

        assignment.id = maxId + 1;
        storage.assignments.push(assignment);
    },

    find() {
        return storage.assignments;
    },

    findByUserId(userId) {
        // TODO: provide a real implementation, getting the groups
        // to which the userId belongs, and filtering by group IDs
        
        // return storage.assignments.filter(x => x.userId = userId);

        return storage.assignments;
    }
};

const tasks = {
    add(task) {
        /* Generate a new ID */
        let ids = storage.tasks.map(a => a.id);

        let maxId = 0;
        if (ids.length) {
            maxId = Math.max(...ids);
        }
        
        task.id = maxId + 1;
        storage.tasks.push(task);
    }
};

const marks = {
    add(mark) {
        // Generate a new ID
        let ids = storage.marks.map(a => a.id);

        let maxId = 0;
        if (ids.length) {
            maxId = Math.max(...ids);
        }
        
        mark.id = maxId + 1;
        storage.marks.push(mark);
    }
};

module.exports = {
    users,
    assignments,
    tasks,
    marks
};
