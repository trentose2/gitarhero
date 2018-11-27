const request = require('supertest');
const app = require('./app');

test('POST /assignments should return 201', (done) => {
    let payload = {
        name: 'Test esame',
        tasks: [1, 2, 3],
        groups: [1],
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    request(app)
        .post('/api/v1/assignments')
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

test('POST /assignments should return 400 when "name" is missing', (done) => {
    let payload = {
        //name: 'Test esame',
        tasks: [1, 2, 3],
        groups: [1],
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    request(app)
        .post('/api/v1/assignments')
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

test('POST /assignments should return 400 when "tasks" is not an array', (done) => {
    let payload = {
        name: 'Test esame',
        tasks: null,
        groups: [1],
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    request(app)
        .post('/api/v1/assignments')
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

test('POST /assignments should return 400 when "tasks" contains invalid values', (done) => {
    let payload = {
        name: 'Test esame',
        tasks: [1, null, true],
        groups: [1],
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    request(app)
        .post('/api/v1/assignments')
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

test('POST /assignments should return 400 when "groups" is missing', (done) => {
    let payload = {
        name: 'Test esame',
        tasks: [1, 2, 3],
        groups: null,
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    request(app)
        .post('/api/v1/assignments')
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

test('POST /assignments should return 400 when "groups" contains invalid values', (done) => {
    let payload = {
        name: 'Test esame',
        tasks: [1, 2, 3],
        groups: [1, false, null, 4],
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    request(app)
        .post('/api/v1/assignments')
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

test('POST /assignments should return 400 when "deadline" is not a date', (done) => {
    let payload = {
        name: 'Test esame',
        tasks: [1, 2, 3],
        groups: [1],
        deadline: 'bla bla',
        status: 'open'
    };

    request(app)
        .post('/api/v1/assignments')
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

test('POST /assignments should return 400 when "status" is not a valid value', (done) => {
    let payload = {
        name: 'Test esame',
        tasks: [1, 2, 3],
        groups: [1],
        deadline: '2018-11-30T00:00:00Z',
        status: 'dunno'
    };

    request(app)
        .post('/api/v1/assignments')
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

test('GET /assignments should return an array', (done) => {
    request(app)
        .get('/api/v1/assignments')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }

            expect(Array.isArray(res.body)).toBe(true);

            done(err);
        });
});