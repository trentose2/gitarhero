let lodash = require('lodash');

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
        let result;
        /* Caso 1: Voglio tutti i mark di un certo utente */
        if (!mark.assignmentId) {
            result = lodash.filter(storage.marks, { 'userId': mark.userId });
        }
        /* Caso 2: Voglio uno specifico mark */
        if (mark.assignmentId) {
            result = lodash.filter(storage.marks, { 'userId': mark.userId, 'assignmentId': mark.assignmentId });
        }
        return result;
    }
};

module.exports = {
    users,
    marks
};