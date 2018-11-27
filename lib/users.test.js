const request = require('supertest');
const app = require('./app');

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