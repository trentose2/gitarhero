const request = require('supertest');
const app = require('../lib/app');

test('POST /answers should return 201', (done) => {
    let payload = {
        userId: 2,
        assignmentId: 4,
        taskId: 8,
        answer: "Yes"
    };

    request(app)
        .post('/api/v1/answers')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(201)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }

            done(err);
        });
});

test('POST /answers should return 400 when "userId" is missing', (done) => {
    let payload = {
        // userId: 2,
        assignmentId: 4,
        taskId: 8,
        answer: "Yes"
    };

    request(app)
        .post('/api/v1/answers')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }

            done(err);
        });
});

test('POST /answers should return 400 when "userId" is not greater than or equal to 0', (done) => {
    let payload = {
        userId: -1,
        assignmentId: 4,
        taskId: 8,
        answer: "Yes"
    };

    request(app)
        .post('/api/v1/answers')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }

            done(err);
        });
});

test('POST /answers should return 400 when "assignmentId" is missing', (done) => {
    let payload = {
        userId: 2,
        // assignmentId: 4,
        taskId: 8,
        answer: "Yes"
    };

    request(app)
        .post('/api/v1/answers')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }

            done(err);
        });
});


test('POST /answers should return 400 when "assignmentId" is not greater than or equal to 0', (done) => {
    let payload = {
        userId: 2,
        assignmentId: -1,
        taskId: 8,
        answer: "Yes"
    };

    request(app)
        .post('/api/v1/answers')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }

            done(err);
        });
});

test('POST /answers should return 400 when "taskId" is missing', (done) => {
    let payload = {
        userId: 2,
        assignmentId: 4,
        // taskId: 8,
        answer: "Yes"
    };

    request(app)
        .post('/api/v1/answers')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }

            done(err);
        });
});


test('POST /answers should return 400 when "taskId" is not greater than or equal to 0', (done) => {
    let payload = {
        userId: 2,
        assignmentId: 4,
        taskId: -1,
        answer: "Yes"
    };

    request(app)
        .post('/api/v1/answers')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }

            done(err);
        });
});

test('POST /answers should return 400 when "answer" is missing', (done) => {
    let payload = {
        userId: 2,
        assignmentId: 4,
        taskId: 8
        // answer: "Yes"
    };

    request(app)
        .post('/api/v1/answers')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }

            done(err);
        });
});

test('GET /answers/:id should return an object', (done) => {
    request(app)
        .get('/api/v1/answers/1')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }

            done(err);
        });
});

test('GET /answers/:id should return 400', (done) => {
    request(app)
        .get('/api/v1/answers/-1')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }

            done(err);
        });
});

test('GET /answers/:id should return 404', (done) => {
    request(app)
        .get('/api/v1/answers/0')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(404)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }

            done(err);
        });
});

test('DELETE /answers/:id should return 204', (done) => {
    request(app)
        .delete(`/api/v1/answers/1`)
        .expect(204)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }

            done(err);
        });
});

test('DELETE /answers/:id should return 400', (done) => {
    request(app)
        .delete(`/api/v1/answers/-1`)
        .expect(400)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }

            done(err);
        });
});

test('DELETE /answers/:id should return 404', (done) => {
    request(app)
        .delete(`/api/v1/answers/0`)
        .expect(404)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }

            done(err);
        });
});
