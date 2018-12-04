const common = require ('./common');

// POST /groups tests
test('POST /groups should return 201 and create a group', async () => {
    let payload = {
        name: 'group name',
        members: [ 1, 2, 3, 4 ]
    }

    const res = await common.postGroup(payload);
    expect(res.status).toBe(201);

});

test('POST /groups should return 400 when "name" is not string', async () => {
    let payload = {
        name: 123,
        members: [
            1, 2, 3, 4
        ]
    }

    const res = await common.postGroup(payload);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "name" must be a non-empty string');
});

test('POST /groups should return 400 when "name" is missing', async () => {
    let payload = {
        // name: "group name",
        members: [ 1, 2, 3, 4 ]
    }

    const res = await common.postGroup(payload);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "name" must be a non-empty string');
});

test('POST /groups should return 400 when "members" contains invalid values', async () => {
    let payload = {
        name: "group name",
        members: [ false, "a", null, -1 ]
    }

    const res = await common.postGroup(payload);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "members" must contain only integers greater or equal to 0');
});

test('POST /groups should return 400 when "members" is not an array', async () => {
    let payload = {
        name: "group name",
        members: 1
    }

    const res = await common.postGroup(payload);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field members must be an array');
});

// GET /groups tests
test('GET /groups should return an array of groups', async () => {
 
    const res = await common.getGroups();

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
});

test('GET /groups?userId=1 should return an array of groups', async () => {
 
    const res = await common.getGroups({userId : 1});

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
});

test('GET /groups?userId= should return 400 when userId is not a number', async () => {

    const res = await common.getGroups({userId : "a"});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The userId query parameter must be an integer greater than 0');
});

test('GET /groups?userId= should return 400 when userId is 0', async () => {
    
    const res = await common.getGroups({userId : 0});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The userId query parameter must be an integer greater than 0');
});

test('GET /groups?userId= should return 400 when userId is negative', async () => {
    
    const res = await common.getGroups({userId : -1});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The userId query parameter must be an integer greater than 0');
});

// PUT /groups/:id tests
test('PUT /groups/:id should return 200 when group is updated', async () => {
    
    let payload = {
        name : "group name",
        members : [1, 2, 3, 4]
    }
    
    let id = 1;

    const res = await common.putGroup(id, payload);
    expect(res.status).toBe(200);
});

test('PUT /groups/:id should return 400 when "name" is not a string', async () => {
    let payload = {
        name: 123,
        members: [ 1, 2, 3, 4 ]
    }

    let id = 1;
    const res = await common.putGroup(id, payload);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "name" must be a non-empty string');
});

test('PUT /groups/:id should return 400 when "members" contains invalid values', async () => {
    let payload = {
        name: "group name",
        members: [ false, "a", null, -1 ]
    }

    let id = 1;

    const res = await common.putGroup(id, payload);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "members" must contain only integers greater than 0');
});

test('PUT /groups/:id should return 400 when "name" is missing', async () => {
    let payload = {
        // name: "group name",
        members: [ 1, 2, 3, 4 ]
    }

    let id = 1;

    const res = await common.putGroup(id, payload);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "name" must be a non-empty string');
});

test('PUT /groups/:id should return 400 when "members" is missing', async () => {
    let payload = {
        name: "group name",
        // members: [ 1, 2, 3, 4 ]
    }

    let id = 1;

    const res = await common.putGroup(id, payload);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field members must be a non-empty array');
});

test('PUT /groups/:id should return 400 when id is 0', async () => {
    
    let payload = {
        name : "group name",
        members : [1, 2, 3, 4]
    }
    
    let id = 0;

    const res = await common.putGroup(id, payload);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The id must be positive and greater than 0');
});

test('PUT /groups/:id should return 400 when id is less than 0', async () => {
    
    let payload = {
        name : "group name",
        members : [1, 2, 3, 4]
    }
    
    let id = -2;

    const res = await common.putGroup(id, payload);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The id must be positive and greater than 0');
});

test('PUT /groups/:id should return 400 when "members" is not an array', async () => {
    let payload = {
        name: "group name",
        members: 1
    }

    let id = 1;

    const res = await common.putGroup(id, payload);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field members must be a non-empty array');
});

test('PUT /groups/:id should return 404 if there is not a group with that id', async () => {
    
    let payload = {
        name : "group name",
        members : [1, 2, 3, 4]
    }
    
    // let id = storage.groups[storage.groups.length].id;
    let id = 100;

    const res = await common.putGroup(id, payload);
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('group not found');
});

// GET /groups/:id/members tests

test('GET /groups/:id/members should return 200 and an array of members', async () => {
    
    const res = await common.getGroupsMembers(1);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

});

test('GET /groups/:id/members should return 400 if id is 0', async () => {
    
    const res = await common.getGroupsMembers(0);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The id must be positive and greater than 0');
    
});

test('GET /groups/:id/members should return 400 if id is less than 0', async () => {
    
    const res = await common.getGroupsMembers(-2);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The id must be positive and greater than 0');
});

test('GET /groups/:id/members should return 404 if there is not a group with that id', async () => {
    
    const res = await common.getGroupsMembers(100);

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('group not found');
});
