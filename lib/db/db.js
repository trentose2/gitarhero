const storage = {
    users: require('../../db/users.json'),
    assignments: require('../../db/assignments.json'),
    tasks: require('../../db/tasks.json'),
    marks: [],
    answers: [],
    groups: require('../../db/groups.json')
    /* TODO: add other arrays */
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

    getBulk() {
        return storage.assignments;
    },

    getByUserId(userId) {
        let result = [];
        for (let assignment of storage.assignments) {
            for (let groupId of assignment.groups) {
                let group = storage.groups.find(x => x.id == groupId);
                if (group.members.includes(parseInt(userId))) {
                    result.push(assignment);
                }
            }
        }
        return result;
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
}

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
