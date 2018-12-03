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
        return storage.users.find(x => x.id == userId);
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
            .filter(g => g.members.includes(userId))
            .map(g => g.id);

        // Filter assignments
        return storage.assignments.filter(assignment =>
            // Take only the assignments where at least one of
            // the groups contains the user
            assignment.groups.some(g =>
                groupsTheUserBelongsTo.includes(g)
            )
        );
    },

    findOneWithId(id) {
        return storage.assignments.find(x => x.id == id);
    },

    findTasksWithAssignment(assignment) {
        return storage.tasks.filter(t =>
            assignment.tasks.includes(t.id)
        );
    },

    removeWithId(id) {
        let index = storage.assignments.findIndex(x => x.id == id);

        if (index >= 0) {
            storage.assignments.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    }
};

const tasks = {
    maxIndex: 0,

    add(task) {
        task.id = (++tasks.maxIndex);
        storage.tasks.push(task);
    },

    findOneWithId(taskId) {
        return storage.tasks.find(t => t.id == taskId);
    },

    removeWithId(id) {
        let index = storage.tasks.findIndex(x => x.id == id);

        if (index >= 0) {
            storage.tasks.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
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

    findOneWithId(groupId) {
        return storage.groups.find(g => g.id == groupId);
    },
    
    findMembersByGroupId(groupId) {

        let group = storage.groups.find(x => x.id == groupId);
        let members = [];
        (group.members).forEach(memberID => {
            members.push(storage.users.find(x => x.id == memberID));
        });

        return members;
    },

    findGroupsByUserId(userId) {

        let groups = [];
        for(let i = 0; i < storage.groups.length; i++) {
            for(let j = 0; j < storage.groups[i].members.length; j++) {
                if(storage.groups[i].members[j].id == userIds) {
                    groups.push(storage.groups[i]);
                    break;
                }
            }
        }

        return groups;
    },

    findIfGroupExist(groupId) {
        let group = storage.groups.find(x => x.id == groupId);
        if(group == undefined){
            return false;
        } else {
            return true;
        }
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
    },

    updateById(group){
        for (var i = 0; i < storage.groups.length; ++i) {
            if (storage.groups[i].id === group.id) {
                storage.groups[i] = group;
            }
        }
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
