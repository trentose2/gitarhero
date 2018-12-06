const request = require('supertest');
const app = require('../lib/app');

function deleteAnswer(id) {
    return request(app)
        .delete(`/api/v1/answers/${id}`);
}

function getAnswer(id) {
    return request(app)
        .get(`/api/v1/answers/${id}`)
        .set('Accept', 'application/json');
}

function getAnswersReview(id) {
    return request(app)
        .get(`/api/v1/answers/${id}/reviews`)
        .set('Accept', 'application/json');
}

function postAnswer(payload) {
    return request(app)
        .post('/api/v1/answers')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
}

function postAnswersReview(id, payload) {
    return request(app)
        .post(`/api/v1/answers/${id}/reviews`)
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
}

function getAssignments(query) {
    let req = request(app)
        .get('/api/v1/assignments')
        .set('Accept', 'application/json');

    if (query) {
        req = req.query(query);
    }

    return req;
}

function getAssignment(id) {
    return request(app)
        .get(`/api/v1/assignments/${id}`)
        .set('Accept', 'application/json');
}

function getAssignmentTasks(id) {
    return request(app)
        .get(`/api/v1/assignments/${id}/tasks`)
        .set('Accept', 'application/json');
}

function deleteAssignment(id) {
    return request(app)
        .delete(`/api/v1/assignments/${id}`);
}

function postAssignment(payload) {
    return request(app)
        .post('/api/v1/assignments')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
}

function putAssignment(id, payload) {
    return request(app)
        .put(`/api/v1/assignments/${id}`)
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
}

function getUser(id) {
    return request(app)
        .get(`/api/v1/users/${id}`)
        .set('Accept', 'application/json');
}

function postUser(user) {
    return request(app)
        .post('/api/v1/users')
        .send(user)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
}

function getGroups(query) {
    let req = request(app)
        .get('/api/v1/groups')
        .set('Accept', 'application/json');

    if (query) {
        req = req.query(query);
    }

    return req;
}

function postGroup(group) {
    return request(app)
        .post('/api/v1/groups')
        .send(group)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
}

function putGroup(id, group) {
    return request(app)
        .put('/api/v1/groups/' + id)
        .send(group)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
}

function getGroupsMembers(id) {
    return request(app)
        .get(`/api/v1/groups/${id}/members`)
        .set('Accept', 'application/json');
}

function getTask(id) {
    return request(app)
        .get(`/api/v1/tasks/${id}`)
        .set('Accept', 'application/json');
}

function postTask(task) {
    return request(app)
        .post('/api/v1/tasks')
        .send(task)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
}

function deleteTask(id) {
    return request(app)
        .delete(`/api/v1/tasks/${id}`);
}

function putTask(id, payload) {
    return request(app)
        .put(`/api/v1/tasks/${id}`)
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
}

function postMark(mark) {
    return request(app)
        .post('/api/v1/marks')
        .send(mark)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
}

function getMark(userId, assignmentId) {
    return request(app)
        .get(`/api/v1/marks?userId=${userId}&assignmentId=${assignmentId}`)
        .set('Accept', 'application/json');
}

module.exports = {
    deleteAnswer,
    getAnswer,
    getAnswersReview,
    postAnswer,
    postAnswersReview,

    /* Assignments */
    getAssignments,
    getAssignment,
    getAssignmentTasks,
    deleteAssignment,
    postAssignment,
    putAssignment,
    getUser,
    postUser,
    getGroups,
    postGroup,
    putGroup,
    getGroupsMembers,

    /* Tasks */
    getTask,    
    postTask,
    deleteTask,
    putTask,
    
    /* Marks */
    postMark,
    getMark
};
