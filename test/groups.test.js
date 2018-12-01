const request = require('supertest');
const app = require('../lib/app');

// POST /groups tests
test('POST /groups should return 201 and create a group', (done) => {
    let payload = {
        name: 'group name',
        members: [ 1, 2, 3, 4 ]
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

// GET /groups tests
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

// PUT /groups/:id tests
test('PUT /groups/:id should return 200 when group is updated', (done) => {
    
    let payload = {
        name : "group name",
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

test('PUT /groups/:id should return 400 when "name" is not a string', (done) => {
    let payload = {
        name: 123,
        members: [ 1, 2, 3, 4 ]
    }

    let id = 1;

    request(app)
        .put('/api/v1/groups/' + id)
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

test('PUT /groups/:id should return 400 when "members" contains invalid values', (done) => {
    let payload = {
        name: "group name",
        members: [ false, "a", null, -1 ]
    }

    let id = 1;

    request(app)
        .post('/api/v1/groups/' + id)
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

test('PUT /groups/:id should return 400 when "name" is missing', (done) => {
    let payload = {
        // name: "group name",
        members: [ 1, 2, 3, 4 ]
    }

    let id = 1;

    request(app)
        .put('/api/v1/groups' + id)
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

test('PUT /groups/:id should return 400 when "members" is missing', (done) => {
    let payload = {
        name: "group name",
        // members: [ 1, 2, 3, 4 ]
    }

    let id = 1;

    request(app)
        .put('/api/v1/groups' + id)
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

test('PUT /groups/:id should return 400 when id is 0', (done) => {
    
    let payload = {
        name : "group name",
        members : [1, 2, 3, 4]
    }
    
    let id = 0;

    request(app)
        .put('/api/v1/groups/' + id)
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
            if(err && res.error){
                console.log(res.error);
            }
           
            done(err);
        });
});

test('PUT /groups/:id should return 400 when id is less than 0', (done) => {
    
    let payload = {
        name : "group name",
        members : [1, 2, 3, 4]
    }
    
    let id = -2;

    request(app)
        .put('/api/v1/groups/' + id)
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
            if(err && res.error){
                console.log(res.error);
            }
           
            done(err);
        });
});

test('PUT /groups/:id should return 404 if there is not a group with that id', (done) => {
    
    let payload = {
        name : "group name",
        members : [1, 2, 3, 4]
    }
    
    // let id = storage.groups[storage.groups.length].id;
    let id = 100;

    request(app)
        .put('/api/v1/groups/' + id)
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(404)
        .end((err, res) => {
            if(err && res.error){
                console.log(res.error);
            }
           
            done(err);
        });
});

// GET /groups/:id/members tests

test('GET /groups/:id/members should return 200 and an array of members', (done) => {
    
    let id = 1;

    request(app)
        .get('/api/v1/groups/' + id + '/members')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
            if(err && res.error){
                console.log(res.error);
            }

            expect(Array.isArray(res.body)).toBe(true);
            done(err);
        });
});

test('GET /groups/:id/members should return 400 if id is 0', (done) => {
    
    let id = 0;

    request(app)
        .get('/api/v1/groups/' + id + '/members')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
            if(err && res.error){
                console.log(res.error);
            }

            done(err);
        });
});

test('GET /groups/:id/members should return 400 if id is less than 0', (done) => {
    
    let id = -2;

    request(app)
        .get('/api/v1/groups/' + id + '/members')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
            if(err && res.error){
                console.log(res.error);
            }

            done(err);
        });
});

test('GET /groups/:id/members should return 404 if there is not a group with that id', (done) => {
    
    // let id = storage.groups[storage.groups.length].id;
    let id = 100;

    request(app)
        .get('/api/v1/groups/' + id + '/members')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(404)
        .end((err, res) => {
            if(err && res.error){
                console.log(res.error);
            }

            done(err);
        });
});
