const storage = {
    users: [],
    assignments: [],
    tasks: [],
    marks: [],
    answers: [],
    groups: []
};

const users = {
    add(user) {
        let ids = storage.users.map(a => a.id);

        let maxId = 0;
        if (ids.length) {
            maxId = Math.max(...ids);
        }

        user.id = maxId + 1;
        storage.users.push(user);
    },

    findUserById(userId) {
        return storage.users.filter(x => x.id == userId);
    }

};

const assignments = {
    maxIndex: 0,

    insert(assignment) {
        assignment.id = (++assignments.maxIndex);
        storage.assignments.push(assignment);
    },

    find() {
        return storage.assignments;
    },

    findWithUserId(userId) {
        // Find the groups the user belongs to
        let groupsTheUserBelongsTo = storage.groups
            .find(g => g.members.includes(userId))
            .map(g => g.id);
        
        // Filter assignments
        return storage.assignments.filter(assignment =>
            // Take only the assignments where at least one of
            // the groups contains the user
            assignment.groups.some(g =>
                groupsTheUserBelongsTo.includes(g.id)
            )
        );
    },

    findOneWithId(id) {
        return storage.assignments.find(x => x.id == id);
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
    },
    
    get(mark) {
        let result = [];
        /* Caso 1: Voglio tutti i mark di un certo utente */
        if (!mark.assignmentId) {
            result = storage.marks.filter(x => x.userId == mark.userId);
        }
        /* Caso 2: Voglio uno specifico mark */
        if (mark.assignmentId) {
            result = storage.marks.filter(x => x.userId == mark.userId && x.assignmentId == mark.assignmentId);
        }
        return result;
    }
};

const answers = {
    add(answer) {
        /* Generate a new ID */
        let ids = storage.answers.map(a => a.id);

        let maxId = 0;
        if (ids.length) {
            maxId = Math.max(...ids);
        }
        
        answer.id = maxId + 1;
        storage.answers.push(answer);
    },

    find(answerId) {
        return storage.answers.find(x => x.id == answerId);
    }
};

const groups = {

    find() {
        return storage.groups;
    },
    add(group) {
        /* Generate a new ID */
        let ids = storage.groups.map(a => a.id);

        let maxId = 0;
        if (ids.length) {
            maxId = Math.max(...ids);
        }
        
        group.id = maxId + 1;
        storage.groups.push(group);
    }
};

module.exports = {
    users,
    assignments,
    tasks,
    marks,
    answers,
    groups
};
