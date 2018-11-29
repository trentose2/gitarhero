const request = require('supertest');
const app = require('./app');

function createGet() {
    return request(app)
        .get('/api/v1/assignments')
        .set('Accept', 'application/json');
}

function createGetOne(id) {
    return request(app)
        .get(`/api/v1/assignments/${id}`)
        .set('Accept', 'application/json');
}

function createPost(payload) {
    return request(app)
        .post('/api/v1/assignments')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
}

test('GET /assignments with no data should return an empty array', async () => {
    const res = await createGet();

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
});

test('POST /assignments should create an assignment', async () => {
    let validPayload = {
        name: 'Test esame',
        tasks: [1, 2, 3],
        groups: [1],
        deadline: '2018-11-30T00:00:00.000Z',
        status: 'open'
    };

    const res = await createPost(validPayload);
    
    // Check response status code
    expect(res.status).toBe(201);
        
    // Check the returned instance
    validPayload.id = 1;
    expect(res.body).toEqual(validPayload);

    // Get the assignment to check that it was actually created
    const res2 = await createGetOne(validPayload.id);

    expect(res2.status).toBe(200);
    expect(res2.body).toEqual(validPayload);
});

test('POST /assignments should return an error when "name" is missing', async () => {
    let payloadWithMissingName = {
        //name: 'Test esame',
        tasks: [1, 2, 3],
        groups: [1],
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    const res = await createPost(payloadWithMissingName);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "name" must be a non-empty string');
});

test('POST /assignments should return an error when "tasks" is not an array', async () => {
    let payloadWithInvalidTasks = {
        name: 'Test esame',
        tasks: null,
        groups: [1],
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    const res = await createPost(payloadWithInvalidTasks);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "tasks" must be an array');
});

test('POST /assignments should return an error when "tasks" contains invalid values', async () => {
    let payloadWithInvalidTasks = {
        name: 'Test esame',
        tasks: [1, null, true],
        groups: [1],
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    const res = await createPost(payloadWithInvalidTasks);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "tasks" must contain only integers');
});

test('POST /assignments should return an error when "groups" is missing', async () => {
    let payloadWithMissingGroups = {
        name: 'Test esame',
        tasks: [1, 2, 3],
        groups: null,
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    const res = await createPost(payloadWithMissingGroups);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "groups" must be an array');
});

test('POST /assignments should return an error when "groups" contains invalid values', async () => {
    let payloadWithInvalidGroups = {
        name: 'Test esame',
        tasks: [1, 2, 3],
        groups: [1, false, null, 4],
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    const res = await createPost(payloadWithInvalidGroups);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "groups" must contain only integers');
});

test('POST /assignments should return an error when "deadline" is not a datetime', async () => {
    let payloadWithInvalidDeadline = {
        name: 'Test esame',
        tasks: [1, 2, 3],
        groups: [1],
        deadline: 'bla bla',
        status: 'open'
    };

    const res = await createPost(payloadWithInvalidDeadline);
    
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "deadline" must be a ISO 8601 datetime string');
});

test('POST /assignments should return an error when "status" is not a valid value', async () => {
    let payloadWithInvalidStatus = {
        name: 'Test esame',
        tasks: [1, 2, 3],
        groups: [1],
        deadline: '2018-11-30T00:00:00Z',
        status: 'dunno'
    };

    const res = await createPost(payloadWithInvalidStatus);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "status" must be one of the two values: "open" or "closed"');
});

test('GET /assignments/999 (non-existing assignment) should return an error', async () => {
    const res = await createGetOne(999);

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('No assignment with id 999 was found');
});

test('GET /assignments/0 (invalid assignment ID) should return an error', async () => {
    const res = await createGetOne(0);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid assignment ID');
});

test('GET /assignments/hehe (invalid assignment ID) should return an error', async () => {
    const res = await createGetOne('hehe');

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid assignment ID');
});

test('GET /assignments/1 should return an assignment', async () => {
    const res = await createGetOne(1);

    let expectedResponse = {
        id: 1,
        name: 'Test esame',
        tasks: [1, 2, 3],
        groups: [1],
        deadline: '2018-11-30T00:00:00.000Z',
        status: 'open'
    };

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expectedResponse);
});

test('GET /assignments should return an array of assignments (1)', async () => {
    const res = await createGet();

    let expectedResponse = [
        {
            id: 1,
            name: 'Test esame',
            tasks: [1, 2, 3],
            groups: [1],
            deadline: '2018-11-30T00:00:00.000Z',
            status: 'open'
        }
    ];

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expectedResponse);
});

test('GET /assignments should return an array of assignments (2)', async () => {
    let expectedResponse = [
        {
            id: 1,
            name: 'Test esame',
            tasks: [1, 2, 3],
            groups: [1],
            deadline: '2018-11-30T00:00:00.000Z',
            status: 'open'
        },
        {
            id: 2,
            name: 'bu bu',
            tasks: [1],
            groups: [],
            deadline: '2018-10-30T00:00:00.000Z',
            status: 'closed'
        },
        {
            id: 3,
            name: '-dasòo321ì',
            tasks: [],
            groups: [1, 2, 3],
            deadline: '2019-11-30T00:00:00.000Z',
            status: 'open'
        }
    ];

    await createPost(expectedResponse[1]);
    await createPost(expectedResponse[2]);

    const res = await createGet();

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expectedResponse);
});
