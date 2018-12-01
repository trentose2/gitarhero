const request = require('supertest');
const app = require('./app');

// Tests on POST /users
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
        // surname : 'surname',
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
        // username : 'username',
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
        // email : 'email@email.com'
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

// Tests on GET /usesr/:id

test('GET /users/:id should return a user', (done) => {

    let id = 1;

    request(app)
        .get('/api/v1/users/' + id)
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

test('GET /users/:id should return 400 when "id" is less than 0', (done) => {

    let id = -2;

    request(app)
        .get('/api/v1/users/' + id)
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

test('GET /users/:id should return 400 when "id" is 0', (done) => {

    let id = 0;

    request(app)
        .get('/api/v1/users/' + id)
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

test('GET /users/:id should return 400 when "id" is not a Number', (done) => {

    let id = "abc";

    request(app)
        .get('/api/v1/users/' + id)
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


test('GET /users/:id should return 404 when user is not found', (done) => {

    // let id = storage.users[storage.users.length].id;
    let id = 100;

    request(app)
        .get('/api/v1/users/' + id)
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