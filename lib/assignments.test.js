const request = require('supertest');
const app = require('./app');

function buildGetAssignments(query) {
    let req = request(app)
        .get('/api/v1/assignments')
        .set('Accept', 'application/json');

    if (query) {
        req = req.query(query);
    }

    return req;
}

function buildGetAssignment(id) {
    return request(app)
        .get(`/api/v1/assignments/${id}`)
        .set('Accept', 'application/json');
}

function buildGetAssignmentTasks(id) {
    return request(app)
        .get(`/api/v1/assignments/${id}/tasks`)
        .set('Accept', 'application/json');
}

function buildPostAssignment(payload) {
    return request(app)
        .post('/api/v1/assignments')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
}

function buildPostUser(user) {
    return request(app)
        .post('/api/v1/users')
        .send(user)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
}

function buildPostGroup(group) {
    return request(app)
        .post('/api/v1/groups')
        .send(group)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
}

function buildPostTask(task) {
    return request(app)
        .post('/api/v1/tasks')
        .send(task)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
}

beforeAll(async () => {
    await buildPostTask({ type: 'Open question', topic: 'topic', question: 'Q', answer: 'A' })
        .expect(201);
    await buildPostTask({ type: 'Open question', topic: 'topic', question: 'Q2', answer: 'A2' })
        .expect(201);
    await buildPostUser({ name: 'Luigi', surname: 'Di Maio', username: 'giggino', email: 'luigi@dimaio.it' })
        .expect(201);
    await buildPostGroup({ name: 'gg', members: [1] })
        .expect(201);
});

test('GET /assignments with empty database should return an empty array', async () => {
    const res = await buildGetAssignments();

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
});

test('POST /assignments should create an assignment', async () => {
    let validPayload = {
        name: 'Test esame',
        tasks: [1, 2],
        groups: [1],
        deadline: '2018-11-30T00:00:00.000Z',
        status: 'open'
    };

    const res = await buildPostAssignment(validPayload);
    
    // Check response status code
    expect(res.status).toBe(201);
        
    // Check the returned instance
    validPayload.id = 1;
    expect(res.body).toEqual(validPayload);

    // Get the assignment to check that it was actually created
    const res2 = await buildGetAssignment(validPayload.id);

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

    const res = await buildPostAssignment(payloadWithMissingName);

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

    const res = await buildPostAssignment(payloadWithInvalidTasks);

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

    const res = await buildPostAssignment(payloadWithInvalidTasks);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "tasks" must contain only integers');
});

test('POST /assignments should return an error when "tasks" contains non-existing task IDs', async () => {
    let payloadWithInvalidTasks = {
        name: 'Test esame',
        tasks: [1, 999],
        groups: [1],
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    const res = await buildPostAssignment(payloadWithInvalidTasks);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The task with id 999 was not found');
});

test('POST /assignments should return an error when "groups" is missing', async () => {
    let payloadWithMissingGroups = {
        name: 'Test esame',
        tasks: [1, 2, 3],
        groups: null,
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    const res = await buildPostAssignment(payloadWithMissingGroups);

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

    const res = await buildPostAssignment(payloadWithInvalidGroups);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "groups" must contain only integers');
});

test('POST /assignments should return an error when "groups" contains non-existing IDs', async () => {
    let payloadWithInvalidGroups = {
        name: 'Test esame',
        tasks: [1, 2],
        groups: [999],
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    const res = await buildPostAssignment(payloadWithInvalidGroups);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The group with id 999 was not found');
});

test('POST /assignments should return an error when "deadline" is missing', async () => {
    let payloadWithMissingDeadline = {
        name: 'Test esame',
        tasks: [1, 2, 3],
        groups: [1],
        // deadline: 'bla bla',
        status: 'open'
    };

    const res = await buildPostAssignment(payloadWithMissingDeadline);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "deadline" must be a non-empty string');
});

test('POST /assignments should return an error when "deadline" is not a datetime', async () => {
    let payloadWithInvalidDeadline = {
        name: 'Test esame',
        tasks: [1, 2, 3],
        groups: [1],
        deadline: 'bla bla',
        status: 'open'
    };

    const res = await buildPostAssignment(payloadWithInvalidDeadline);
    
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

    const res = await buildPostAssignment(payloadWithInvalidStatus);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "status" must be one of the two values: "open" or "closed"');
});

test('GET /assignments/999 (non-existing assignment) should return an error', async () => {
    const res = await buildGetAssignment(999);

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('No assignment with id 999 was found');
});

test('GET /assignments/0 (invalid assignment ID) should return an error', async () => {
    const res = await buildGetAssignment(0);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid assignment ID');
});

test('GET /assignments/hehe (invalid assignment ID) should return an error', async () => {
    const res = await buildGetAssignment('hehe');

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid assignment ID');
});

test('GET /assignments/1 should return an assignment', async () => {
    const res = await buildGetAssignment(1);

    let expectedResponse = {
        id: 1,
        name: 'Test esame',
        tasks: [1, 2],
        groups: [1],
        deadline: '2018-11-30T00:00:00.000Z',
        status: 'open'
    };

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expectedResponse);
});

test('GET /assignments should return an array of assignments (1)', async () => {
    const res = await buildGetAssignments();

    let expectedResponse = [
        {
            id: 1,
            name: 'Test esame',
            tasks: [1, 2],
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
            tasks: [1, 2],
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
            groups: [1],
            deadline: '2019-11-30T00:00:00.000Z',
            status: 'open'
        }
    ];

    await buildPostAssignment(expectedResponse[1]);
    await buildPostAssignment(expectedResponse[2]);

    const res = await buildGetAssignments();

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expectedResponse);
});

test('GET /assignments?userId=1 should return assignments for the user', async () => {
    let expectedResponse = [
        {
            id: 1,
            name: 'Test esame',
            tasks: [1, 2],
            groups: [1],
            deadline: '2018-11-30T00:00:00.000Z',
            status: 'open'
        },
        {
            id: 3,
            name: '-dasòo321ì',
            tasks: [],
            groups: [1],
            deadline: '2019-11-30T00:00:00.000Z',
            status: 'open'
        }
    ];

    const res = await buildGetAssignments({ userId: 1 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expectedResponse);
});

test('GET /assignments?userId=bla should return an error (invalid userId)', async () => {
    const res = await buildGetAssignments({ userId: 'bla' });

    expect(res.status).toBe(400);
    expect(res.body.error).toEqual('The userId query parameter must be a positive integer');

    const res2 = await buildGetAssignments({ userId: '-1' });

    expect(res2.status).toBe(400);
    expect(res2.body.error).toEqual('The userId query parameter must be a positive integer');
});

test('GET /assignments/1/tasks should return tasks for the assignment', async () => {
    let expectedResponse = [
        { id: 1, type: 'Open question', topic: 'topic', question: 'Q', answer: 'A' },
        { id: 2, type: 'Open question', topic: 'topic', question: 'Q2', answer: 'A2' }
    ];

    const res = await buildGetAssignmentTasks(1);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expectedResponse);
});

test('GET /assignments/999/tasks (non-existing assignment) should return an error', async () => {
    const res = await buildGetAssignmentTasks(999);

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('No assignment with id 999 was found');
});

test('GET /assignments/0/tasks (invalid assignment ID) should return an error', async () => {
    const res = await buildGetAssignmentTasks(0);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid assignment ID');
});

test('GET /assignments/hehe/tasks (invalid assignment ID) should return an error', async () => {
    const res = await buildGetAssignmentTasks('hehe');

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid assignment ID');
});
