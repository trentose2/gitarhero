const request = require('supertest');
const app = require('../lib/app');

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

function postUser(user) {
    return request(app)
        .post('/api/v1/users')
        .send(user)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
}

function postGroup(group) {
    return request(app)
        .post('/api/v1/groups')
        .send(group)
        .set('Content-Type', 'application/json')
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

module.exports = {
    /* Assignments */
    getAssignments,
    getAssignment,
    getAssignmentTasks,
    deleteAssignment,
    postAssignment,
    putAssignment,
    postUser,
    postGroup,

    /* Tasks */
    getTask,    
    postTask,
    deleteTask
};
