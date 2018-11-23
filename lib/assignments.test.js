const request = require('supertest');
const app = require('./app');

test('POST /assignments should return 201 and the created assignment', async () => {
    let payload = {
        name: 'Test esame',
        tasks: [1, 2, 3],
        groups: [1],
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    await request(app)
        .post('/api/v1/assignments')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(201, payload);
});
