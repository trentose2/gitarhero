const common = require ('./common');

// Tests on POST /users
test('POST /users should return 201', async () => {
    let user = {
        name : 'firstname',
        surname : 'surname',
        username : 'username',
        email : 'email@email.com'
    }

    const res = await common.postUser(user);
    expect(res.status).toBe(201);
});

test('POST /users should return 400 when "name" is missing', async () => {
    let user = {
        // name : 'firstname',
        surname : 'surname',
        username : 'username',
        email : 'email@email.com'
    }

    const res = await common.postUser(user);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "name" must be a non-empty string');
});

test('POST /users should return 400 when "surname" is missing', async () => {
    let user = {
        name : 'firstname',
        // surname : 'surname',
        username : 'username',
        email : 'email@email.com'
    }

    const res = await common.postUser(user);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "surname" must be a non-empty string');
});

test('POST /users should return 400 when "username" is missing', async () => {
    let user = {
        name : 'firstname',
        surname : 'surname',
        // username : 'username',
        email : 'email@email.com'
    }

    const res = await common.postUser(user);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "username" must be a non-empty string');
});

test('POST /users should return 400 when "email" is missing', async () => {
    let user = {
        name : 'firstname',
        surname : 'surname',
        username : 'username',
        // email : 'email@email.com'
    }

    const res = await common.postUser(user);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "email" must be a non-empty string, in email format');
});

test('POST /users should return 400 when "name" is not a string', async () => {
    let user = {
        name : 123,
        surname : 'surname',
        username : 'username',
        email : 'email@email.com'
    }

    const res = await common.postUser(user);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "name" must be a non-empty string');
});

test('POST /users should return 400 when "surname" is not a string', async () => {
    let user = {
        name : 'firstname',
        surname : 123,
        username : 'username',
        email : 'email@email.com'
    }

    const res = await common.postUser(user);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "surname" must be a non-empty string');
});

test('POST /users should return 400 when "username" is not a string', async () => {
    let user = {
        name : 'firstname',
        surname : 'surname',
        username : 123,
        email : 'email@email.com'
    }

    const res = await common.postUser(user);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "username" must be a non-empty string');
});

test('POST /users should return 400 when "email" is not a string', async () => {
    let user = {
        name : 'firstname',
        surname : 'surname',
        username : 'username',
        email : 123
    }

    const res = await common.postUser(user);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "email" must be a non-empty string, in email format');
});

test('POST /users should return 400 when "email" is not in email format', async () => {
    let user = {
        name : 'firstname',
        surname : 'surname',
        username : 'username',
        email : 'email.com'
    }

    const res = await common.postUser(user);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "email" must be a non-empty string, in email format');
});

// Tests on GET /users/:id

test('GET /users/:id should return a user', async () => {

    let id = 1;

    const res = await common.getUser(id);
    expect(res.status).toBe(200);
});

test('GET /users/:id should return 400 when "id" is less than 0', async () => {

    let id = -2;

    const res = await common.getUser(id);
    expect(res.status).toBe(400);  
    expect(res.body.error).toBe('Field "id" must be a number and greater than 0');
});

test('GET /users/:id should return 400 when "id" is 0', async () => {

    let id = 0;

    const res = await common.getUser(id);
    expect(res.status).toBe(400);  
    expect(res.body.error).toBe('Field "id" must be a number and greater than 0');
});

test('GET /users/:id should return 400 when "id" is not a Number', async () => {

    let id = "abc";

    const res = await common.getUser(id);
    expect(res.status).toBe(400);  
    expect(res.body.error).toBe('Field "id" must be a number and greater than 0');
});


test('GET /users/:id should return 404 when user is not found', async () => {

    // let id = storage.users[storage.users.length].id;
    let id = 100;

    const res = await common.getUser(id);

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('user not found');
});