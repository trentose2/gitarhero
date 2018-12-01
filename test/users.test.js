const request = require('supertest');
const app = require('../lib/app');

test('POST /users should return 201', (done) => {
    let payload = {
        name : 'firstname',
        surname : 'surname',
        username : 'username',
        email : 'email@email.com'
    }

    request(app)
        .post('/api/v1/users')
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

test('POST /users should return 400 when "name" is missing', (done) => {
    let payload = {
        // name : 'firstname',
        surname : 'surname',
        username : 'username',
        email : 'email@email.com'
    }

    request(app)
        .post('/api/v1/users')
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

test('POST /users should return 400 when "surname" is missing', (done) => {
    let payload = {
        name : 'firstname',
        // surname : null,
        username : 'username',
        email : 'email@email.com'
    }

    request(app)
        .post('/api/v1/users')
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

test('POST /users should return 400 when "username" is missing', (done) => {
    let payload = {
        name : 'firstname',
        surname : 'surname',
        // username : null,
        email : 'email@email.com'
    }

    request(app)
        .post('/api/v1/users')
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

test('POST /users should return 400 when "email" is missing', (done) => {
    let payload = {
        name : 'firstname',
        surname : 'surname',
        username : 'username',
        // email : null
    }

    request(app)
        .post('/api/v1/users')
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

test('POST /users should return 400 when "name" is not a string', (done) => {
    let payload = {
        name : 123,
        surname : 'surname',
        username : 'username',
        email : 'email@email.com'
    }

    request(app)
        .post('/api/v1/users')
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

test('POST /users should return 400 when "surname" is not a string', (done) => {
    let payload = {
        name : 'firstname',
        surname : 123,
        username : 'username',
        email : 'email@email.com'
    }

    request(app)
        .post('/api/v1/users')
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

test('POST /users should return 400 when "username" is not a string', (done) => {
    let payload = {
        name : 'firstname',
        surname : 'surname',
        username : 123,
        email : 'email@email.com'
    }

    request(app)
        .post('/api/v1/users')
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

test('POST /users should return 400 when "email" is not a string', (done) => {
    let payload = {
        name : 'firstname',
        surname : 'surname',
        username : 'username',
        email : 123
    }

    request(app)
        .post('/api/v1/users')
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

test('POST /users should return 400 when "email" is not in email format', (done) => {
    let payload = {
        name : 'firstname',
        surname : 'surname',
        username : 'username',
        email : 'email.com'
    }

    request(app)
        .post('/api/v1/users')
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

test('GET /users/:id should return an object', (done) => {

    request(app)
        .get('/api/v1/users/1')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }

            expect(res.body != null).toBe(true);
            done(err);
        });
});

test('GET /users should return 400 when "id" is less than 0', (done) => {

    request(app)
        .get('/api/v1/users/-2')
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

test('GET /users should return 400 when "id" is not a Number', (done) => {

    request(app)
        .get('/api/v1/users/abc')
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