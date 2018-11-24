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
        if (!mark || !mark.userId || !mark.assignmentId || !mark.mark || isNaN(mark.userId) || mark.userId <= 0 || isNaN(mark.assignmentId) || mark.assignmentId <= 0 || isNaN(mark.mark) || (mark.text && typeof mark.text != 'string')) {
            //Todo? In realtà siamo già sicuri sia un oggetto ben formato, e non nullo...
        }
        // Generate a new ID
        let ids = storage.marks.map(a => a.id);

        let maxId = 0;
        if (ids.length) {
            maxId = Math.max(...ids);
        }

        mark.id = maxId + 1;
        storage.marks.push(mark);
    },
    get(queriedMark) {
        if (!queriedMark || !mark.userId || isNaN(mark.userId) || mark.userId <= 0 || (mark.assignmentId && (isNan(assignmentId) || assignmentId <= 0))) {
            //Todo? In realtà siamo già sicuri sia un oggetto ben formato, e non nullo...    
        }
        let mark;
        /* Caso 1: Voglio tutti i mark di un certo utente */
        if (!queriedMark.assignmentId) {
            mark = lodash.filter(storage.marks, { 'userId': queriedMark.userId });
        }
        /* Caso 2: Voglio uno specifico mark */
        if (queriedMark.assignmentId) {
            mark = lodash.filter(storage.marks, { 'userId': queriedMark.userId, 'assignmentId': queriedMark.assignmentId });
        }
        if (!mark) {
            mark = {
                error: 'No mark found'
            };
        }

        /* Simulo che il database abbia restituito qualcosa */
        let test = {
            userId: 12,
            assignmentId: 5,
            mark: 29
        };
        return test;
    }
};

module.exports = {
    users,
    marks
};