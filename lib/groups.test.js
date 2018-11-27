const request = require('supertest');
const app = require('./app');

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