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
    insert(mark) {
        storage.marks.push(mark);
    },   
    getSpecific(userId, assignmentId) {
        //console.log("userId = " + user + ", assignmentId = " + assignmentId);
        return result = (storage.marks.filter(m => m.userId == userId && m.assignmentId == assignmentId))[0];
    },
    getBulk(userId) {
        return result = storage.marks.filter(m => m.userId == userId);
    }
};

const answers = {
    maxIndex: 0,

    insert(answer) {
        answer.id = (++answers.maxIndex);
        storage.answers.push(answer);
    },

    insertReview(answerId, text) {
        answer = this.find(answerId)

        if (answer) {
            answer.reviews.push( { text: text } );
            return true
        }

        return false
    },

    find(answerId) {
        return storage.answers.find(x => x.id == answerId);
    },

    remove(answerId) {
        let index = storage.answers.findIndex(x => x.id == answerId)

        if (index != -1) {
            storage.answers.splice(index, 1)
            return true
        }

        return false
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
        
        marks.id = maxId + 1;
        storage.marks.push(marks);
    }
};

module.exports = {
    users,
    marks
};
