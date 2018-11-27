const request = require('supertest');
const app = require('./app');

test('POST /users should return 201', (done) => {
    let payload = {
        name : 'firstname',
        surname : 'surname',
        username : 'username',
        email : 'email'
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
        email : 'email'
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
        email : 'email'
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
        email : 'email'
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
        email : 'email'
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
        email : 'email'
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
        email : 'email'
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