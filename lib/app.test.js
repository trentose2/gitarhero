const request = require('supertest');
const app = require('./app');

test('app module should be defined', () => {
    expect(app).toBeDefined();
});

test('GET / should return 404', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(404);
});
