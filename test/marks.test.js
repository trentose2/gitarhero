const common = require('./common');

const request = require('supertest');
const app = require('../lib/app');

beforeAll(async () => {
    /* Eventualmente, uso questa funzione per inizializzare il database con qualche valore */
});

test('POST /marks should return 201 and the created mark', async () => {
    let validPayload = {
        userId : 1,
        assignmentId : 2,
        mark : 29,
        text : 'Ottimo lavoro!'
    };
    const res = await common.postMark(validPayload);
    // Check response status code
    expect(res.status).toBe(201);     
    // Check the returned instance
    expect(res.body).toEqual(validPayload);
    // Get the task to check that it was actually created
    const res2 = await common.getMark(validPayload.userId, validPayload.assignmentId);
    expect(res2.status).toBe(200);
    expect(res2.body).toEqual(validPayload);
});

test('GET /marks&userId=2 should return a collection of marks', async () => {
    /* Simuliamo l'aggiunta di due mark */
    let p1 = {
        userId : 2,
        assignmentId : 4,
        mark : 25,
    };
    let p2 = {
        userId : 2,
        assignmentId : 5,
        mark : 28,
    };

    let res1 = await common.postMark(p1);
    let res2 = await common.postMark(p2);
    expect(res1.status).toBe(201);
    expect(res2.status).toBe(201);

    let res3 = await common.getMark("2", "");
    expect(res3.status).toBe(200);
    expect(res3.body).toContainEqual(p1);
    expect(res3.body).toContainEqual(p2);
});

test('GET /marks&userId=2&assignmentId=4 should return a mark', async () => {
    /* Simuliamo l'aggiunta di un mark */
    let p1 = {
        userId : 2,
        assignmentId : 4,
        mark : 25,
    };

    let res1 = await common.postMark(p1);
    expect(res1.status).toBe(201);

    let res2 = await common.getMark("2", "4");
    expect(res2.status).toBe(200);
    expect(res2.body).toEqual(p1);
});

test('GET /marks should return 400 when no parameter is sent', async () => {
    const res = await common.getMark("", "");
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Parameter "userId" is mandatory to achieve a minimum request');
});

test('POST /marks should return 400 when "mark" is missing', async () => {
    let invalidPayload = {
        //mark : 29,
        text : 'Ottimo lavoro!'
    };
    const res = await common.postMark(invalidPayload);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "mark" is mandatory and must be an integer greater than 0');
});

test('GET /marks?userId=John should return 400', async () => {
    const res = await common.getMark("John");
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Parameter "userId" must be an integer');

});

test('POST /marks should return 400 when "mark" is not a number', async () => {
    let invalidPayload = {
        mark : 'Cat',
        text : 'Ottimo lavoro!'
    };
    const res = await common.postMark(invalidPayload);
});

test('GET /marks?userId=-2 should return 400', async () => {
    const res = await common.getMark(-2);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Parameter "userId" must be an integer greater than 0');
});

test('POST /marks should return 400 when "mark" is not an integer greater than 0', async () => {
    let invalidPayload = {
        mark : -5,
        text : 'Ottimo lavoro!'
    };
    const res = await common.postMark(invalidPayload);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "mark" is mandatory and must be an integer greater than 0');
});

test('GET /marks?userId=&assignmentId=5 should return 400', async () => {
    const res = await common.getMark("", 5);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Parameter "userId" is mandatory to achieve a minimum request'); 
});

test('POST /marks should return 400 when "text" is not a string', async () => {
    let invalidPayload = {
        mark : 29,
        text : 12345
    };
    const res = await common.postMark(invalidPayload);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "text" must be a string');
});

test('POST /marks should return 400 when "text" is present but "mark" is not', async () => {
    let invalidPayload = {
        text : 'Ottimo lavoro!'
    };
    const res = await common.postMark(invalidPayload);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "mark" is mandatory and must be an integer greater than 0');
});

test('GET /marks?userId=1&assignmentId=foo should return 400', async () => { 
    const res = await common.getMark(1, "foo");
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Parameter "assignmentId" must be an integer'); 
});

test('GET /marks?userId=1&assignmentId=-5 should return 400', async () => { 
    const res = await common.getMark(1, -5);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Parameter "assignmentId" must be an integer greater than 0'); 
});