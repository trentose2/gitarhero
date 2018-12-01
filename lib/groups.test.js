const request = require('supertest');
const app = require('./app');

// post /groups test
test('POST /groups should return 201 and create a group', (done) => {
    let payload = {
        name: 'group name',
        members: [
            1, 2, 3, 4
        ]
    }

    request(app)
        .post('/api/v1/groups')
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

test('POST /groups should return 400 when "name" is not string', (done) => {
    let payload = {
        name: 123,
        members: [
            1, 2, 3, 4
        ]
    }

    request(app)
        .post('/api/v1/groups')
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

test('POST /groups should return 400 when "name" is missing', (done) => {
    let payload = {
        // name: "group name",
        members: [ 1, 2, 3, 4 ]
    }

    request(app)
        .post('/api/v1/groups')
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

test('POST /groups should return 400 when "members" contains invalid values', (done) => {
    let payload = {
        name: "group name",
        members: [ false, "a", null, -1 ]
    }

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

// get /groups tests
test('GET /groups should return an array of groups', (done) => {
    request(app)
        .get('/api/v1/groups')
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

// put /groups/:id
test('PUT /groups/:id should return 200 when group is updated', (done) => {
    
    let payload = {
        name : "group",
        members : [1, 2, 3, 4]
    }
    
    let id = 1;

    request(app)
        .put('/api/v1/groups/' + id)
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
            if(err && res.error){
                console.log(res.error);
            }
           
            done(err);
        });
});