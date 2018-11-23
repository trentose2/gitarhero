const request = require('supertest');
const app = require('./app');

test('POST /marks should return 201 and the created mark', (done) => {
    let payload = {
        mark : 29,
        text : 'Ottimo lavoro!'
    };

    request(app)
        .post('/api/v1/marks')
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

test('POST /marks should return 400 when "mark" is missing', (done) => {
    let payload = {
        //mark : 29,
        text : 'Ottimo lavoro!'
    };

    request(app)
        .post('/api/v1/marks')
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

test('POST /marks should return 400 when "mark" is not a number', (done) => {
    let payload = {
        mark : 'Cat',
        text : 'Ottimo lavoro!'
    };

    request(app)
        .post('/api/v1/marks')
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

test('POST /marks should return 400 when "mark" is not a number greater than 0', (done) => {
    let payload = {
        mark : -5,
        text : 'Ottimo lavoro!'
    };

    request(app)
        .post('/api/v1/marks')
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

test('POST /marks should return 400 when "text" is not a string', (done) => {
    let payload = {
        mark : 29,
        text : 12345
    };

    request(app)
        .post('/api/v1/marks')
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

test('POST /marks should return 400 when "text" is present but "mark" is not', (done) => {
    let payload = {
        text : 'Ottimo lavoro!'
    };

    request(app)
        .post('/api/v1/marks')
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
