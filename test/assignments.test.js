const common = require ('./common');

/* Popoliamo il database mediante delle richieste ad-hoc */
beforeAll(async () => {
    await common.postTask({ type: 'Open question', topic: 'topic', question: 'Q', answers: 'A' })
        .expect(201);
    await common.postTask({ type: 'Open question', topic: 'topic', question: 'Q2', answers: 'A2' })
        .expect(201);
    await common.postUser({ name: 'Luigi', surname: 'Di Maio', username: 'giggino', email: 'luigi@dimaio.it' })
        .expect(201);
    await common.postGroup({ name: 'gg', members: [1] })
        .expect(201);
});


test('GET /assignments with empty database should return an empty array', async () => {
    const res = await common.getAssignments();

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

    const res = await common.postAssignment(validPayload);
    
    // Check response status code
    expect(res.status).toBe(201);
        
    // Check the returned instance
    validPayload.id = 1;
    expect(res.body).toEqual(validPayload);

    // Get the assignment to check that it was actually created
    const res2 = await common.getAssignment(validPayload.id);

    expect(res2.status).toBe(200);
    expect(res2.body).toEqual(validPayload);
});

test('POST /assignments should return an error when "name" is missing', async () => {
    let payloadWithMissingName = {
        //name: 'Test esame',
        tasks: [1, 2],
        groups: [1],
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    const res = await common.postAssignment(payloadWithMissingName);

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

    const res = await common.postAssignment(payloadWithInvalidTasks);

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

    const res = await common.postAssignment(payloadWithInvalidTasks);
   
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

    const res = await common.postAssignment(payloadWithInvalidTasks);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The task with id 999 was not found');
});

test('POST /assignments should return an error when "groups" is missing', async () => {
    let payloadWithMissingGroups = {
        name: 'Test esame',
        tasks: [1, 2],
        groups: null,
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    const res = await common.postAssignment(payloadWithMissingGroups);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "groups" must be an array');
});

test('POST /assignments should return an error when "groups" contains invalid values', async () => {
    let payloadWithInvalidGroups = {
        name: 'Test esame',
        tasks: [1, 2],
        groups: [1, false, null, 4],
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    const res = await common.postAssignment(payloadWithInvalidGroups);

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

    const res = await common.postAssignment(payloadWithInvalidGroups);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The group with id 999 was not found');
});

test('POST /assignments should return an error when "deadline" is missing', async () => {
    let payloadWithMissingDeadline = {
        name: 'Test esame',
        tasks: [1, 2],
        groups: [1],
        // deadline: 'bla bla',
        status: 'open'
    };

    const res = await common.postAssignment(payloadWithMissingDeadline);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "deadline" must be a non-empty string');
});

test('POST /assignments should return an error when "deadline" is not a datetime', async () => {
    let payloadWithInvalidDeadline = {
        name: 'Test esame',
        tasks: [1, 2],
        groups: [1],
        deadline: 'bla bla',
        status: 'open'
    };

    const res = await common.postAssignment(payloadWithInvalidDeadline);
    
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "deadline" must be a ISO 8601 datetime string');
});

test('POST /assignments should return an error when "status" is not a valid value', async () => {
    let payloadWithInvalidStatus = {
        name: 'Test esame',
        tasks: [1, 2],
        groups: [1],
        deadline: '2018-11-30T00:00:00Z',
        status: 'dunno'
    };

    const res = await common.postAssignment(payloadWithInvalidStatus);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "status" must be one of the two values: "open" or "closed"');
});

test('GET /assignments/999 (non-existing assignment) should return an error', async () => {
    const res = await common.getAssignment(999);

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('No assignment with id 999 was found');
});

test('GET /assignments/0 (invalid assignment ID) should return an error', async () => {
    const res = await common.getAssignment(0);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid assignment ID');
});

test('GET /assignments/hehe (invalid assignment ID) should return an error', async () => {
    const res = await common.getAssignment('hehe');

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid assignment ID');
});

test('GET /assignments/1 should return an assignment', async () => {
    const res = await common.getAssignment(1);

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
    const res = await common.getAssignments();

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

    await common.postAssignment(expectedResponse[1]);
    await common.postAssignment(expectedResponse[2]);

    const res = await common.getAssignments();

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

    const res = await common.getAssignments({ userId: 1 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expectedResponse);
});

test('GET /assignments?userId=bla should return an error (invalid userId)', async () => {
    const res = await common.getAssignments({ userId: 'bla' });

    expect(res.status).toBe(400);
    expect(res.body.error).toEqual('The userId query parameter must be a positive integer');

    const res2 = await common.getAssignments({ userId: '-1' });

    expect(res2.status).toBe(400);
    expect(res2.body.error).toEqual('The userId query parameter must be a positive integer');
});

test('GET /assignments/1/tasks should return tasks for the assignment', async () => {
    let expectedResponse = [
        { id: 1, type: 'Open question', topic: 'topic', question: 'Q', answers: 'A' },
        { id: 2, type: 'Open question', topic: 'topic', question: 'Q2', answers: 'A2' }
    ];

    const res = await common.getAssignmentTasks(1);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expectedResponse);
});

test('GET /assignments/999/tasks (non-existing assignment) should return an error', async () => {
    const res = await common.getAssignmentTasks(999);

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('No assignment with id 999 was found');
});

test('GET /assignments/0/tasks (invalid assignment ID) should return an error', async () => {
    const res = await common.getAssignmentTasks(0);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid assignment ID');
});

test('GET /assignments/hehe/tasks (invalid assignment ID) should return an error', async () => {
    const res = await common.getAssignmentTasks('hehe');

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid assignment ID');
});

test('PUT /assignments/1 should update the assignment', async () => {
    let updatedData = {
        name: 'Test esame aggiornato',
        tasks: [1],
        groups: [],
        deadline: '2017-11-30T00:00:00.000Z',
        status: 'closed'
    };

    const res = await common.putAssignment(1, updatedData);

    // Check response status code
    expect(res.status).toBe(200);
    
    // Check the returned instance
    updatedData.id = 1;
    expect(res.body).toEqual(updatedData);

    // Get the assignment to check that it was actually updated
    const res2 = await common.getAssignment(updatedData.id);

    expect(res2.status).toBe(200);
    expect(res2.body).toEqual(updatedData);
});

test('PUT /assignments/1 with empty payload should return OK and do nothing', async () => {
    let emptyPayload = {};

    const res = await common.putAssignment(1, emptyPayload);

    // Check response status code
    expect(res.status).toBe(200);

    let expected = {
        id: 1,
        name: 'Test esame aggiornato',
        tasks: [1],
        groups: [],
        deadline: '2017-11-30T00:00:00.000Z',
        status: 'closed'
    };

    expect(res.body).toEqual(expected);

    // Check that nothing was actually destroyed
    const res2 = await common.getAssignment(expected.id);

    expect(res2.status).toBe(200);
    expect(res2.body).toEqual(expected);
});

test('PUT /assignments/999 (non-existing assignment) should return an error', async () => {
    const res = await common.putAssignment(999, {});

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('No assignment with id 999 was found');
});

test('PUT /assignments/0 (invalid assignment ID) should return an error', async () => {
    const res = await common.putAssignment(0, {});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid assignment ID');
});

test('PUT /assignments/hehe (invalid assignment ID) should return an error', async () => {
    const res = await common.putAssignment('hehe', {});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid assignment ID');
});

test('PUT /assignments/1 should return an error when "name" is not a string', async () => {
    let payloadWithWrongName = {
        name: true,
        tasks: [1, 2],
        groups: [1],
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    const res = await common.putAssignment(1, payloadWithWrongName);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "name" must be a non-empty string');
});

test('PUT /assignments/1 should return an error when "tasks" is not an array', async () => {
    let payloadWithInvalidTasks = {
        name: 'Test esame',
        tasks: null,
        groups: [1],
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    const res = await common.putAssignment(1, payloadWithInvalidTasks);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "tasks" must be an array');
});

test('PUT /assignments/1 should return an error when "tasks" contains invalid values', async () => {
    let payloadWithInvalidTasks = {
        name: 'Test esame',
        tasks: [1, null, true],
        groups: [1],
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    const res = await common.putAssignment(1, payloadWithInvalidTasks);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "tasks" must contain only integers');
});

test('PUT /assignments should return an error when "tasks" contains non-existing task IDs', async () => {
    let payloadWithInvalidTasks = {
        name: 'Test esame',
        tasks: [1, 999],
        groups: [1],
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    const res = await common.putAssignment(1, payloadWithInvalidTasks);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The task with id 999 was not found');
});

test('PUT /assignments/1 should return an error when "groups" is not an array', async () => {
    let payloadWithMissingGroups = {
        name: 'Test esame',
        tasks: [1, 2],
        groups: null,
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    const res = await common.putAssignment(1, payloadWithMissingGroups);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "groups" must be an array');
});

test('PUT /assignments/1 should return an error when "groups" contains invalid values', async () => {
    let payloadWithInvalidGroups = {
        name: 'Test esame',
        tasks: [1, 2],
        groups: [1, false, null, 4],
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    const res = await common.putAssignment(1, payloadWithInvalidGroups);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "groups" must contain only integers');
});

test('PUT /assignments/1 should return an error when "groups" contains non-existing IDs', async () => {
    let payloadWithInvalidGroups = {
        name: 'Test esame',
        tasks: [1, 2],
        groups: [999],
        deadline: '2018-11-30T00:00:00Z',
        status: 'open'
    };

    const res = await common.putAssignment(1, payloadWithInvalidGroups);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The group with id 999 was not found');
});

test('PUT /assignments/1 should return an error when "deadline" is not a string', async () => {
    let payloadWithMissingDeadline = {
        name: 'Test esame',
        tasks: [1, 2],
        groups: [1],
        deadline: 150,
        status: 'open'
    };

    const res = await common.putAssignment(1, payloadWithMissingDeadline);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "deadline" must be a non-empty string');
});

test('PUT /assignments/1 should return an error when "deadline" is not a datetime', async () => {
    let payloadWithInvalidDeadline = {
        name: 'Test esame',
        tasks: [1, 2],
        groups: [1],
        deadline: 'bla bla',
        status: 'open'
    };

    const res = await common.putAssignment(1, payloadWithInvalidDeadline);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "deadline" must be a ISO 8601 datetime string');
});

test('PUT /assignments/1 should return an error when "status" is not a valid value', async () => {
    let payloadWithInvalidStatus = {
        name: 'Test esame',
        tasks: [1, 2],
        groups: [1],
        deadline: '2018-11-30T00:00:00Z',
        status: 'dunno'
    };

    const res = await common.putAssignment(1, payloadWithInvalidStatus);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "status" must be one of the two values: "open" or "closed"');
});


test('DELETE /assignments/1 should remove the assignment', async () => {
    const res = await common.deleteAssignment(1);

    expect(res.status).toBe(204);

    // Check if it was actually deleted
    const res2 = await common.getAssignment(1);
    expect(res2.status).toBe(404);
});

test('DELETE /assignments/999 (non-existing assignment) should return an error', async () => {
    const res = await common.deleteAssignment(999);

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('No assignment with id 999 was found');
});

test('DELETE /assignments/0 (invalid assignment ID) should return an error', async () => {
    const res = await common.deleteAssignment(0);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid assignment ID');
});

test('DELETE /assignments/hehe (invalid assignment ID) should return an error', async () => {
    const res = await common.deleteAssignment('hehe');

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid assignment ID');
});
