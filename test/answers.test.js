const common = require("./common");

test('POST /answers should return an answer', async () => {
    let validPayload = {
        userId: 2,
        assignmentId: 4,
        taskId: 8,
        answer: "Yes"
    };

    const res = await common.postAnswer(validPayload);

    expect(res.status).toBe(201);
});

test('POST /answers should return 400 ("userId" is missing)', async () => {
    let invalidPayload = {
        assignmentId: 4,
        taskId: 8,
        answer: "Yes"
    };

    const res = await common.postAnswer(invalidPayload);

    expect(res.status).toBe(400);
});

test('POST /answers should return 400 ("userId" < 0)', async () => {
    let invalidPayload = {
        userId: -1,
        assignmentId: 4,
        taskId: 8,
        answer: "Yes"
    };

    const res = await common.postAnswer(invalidPayload)

    expect(res.status).toBe(400);
});

test('POST /answers should return 400 ("assignmentId" is missing)', async () => {
    let invalidPayload = {
        userId: 2,
        taskId: 8,
        answer: "Yes"
    };

    const res = await common.postAnswer(invalidPayload)

    expect(res.status).toBe(400);
});


test('POST /answers should return 400 ("assignmentId" < 0)', async () => {
    let invalidPayload = {
        userId: 2,
        assignmentId: -1,
        taskId: 8,
        answer: "Yes"
    };

    const res = await common.postAnswer(invalidPayload)

    expect(res.status).toBe(400);
});

test('POST /answers should return 400 ("taskId" is missing)', async () => {
    let invalidPayload = {
        userId: 2,
        assignmentId: 4,
        answer: "Yes"
    };

    const res = await common.postAnswer(invalidPayload)

    expect(res.status).toBe(400);
});


test('POST /answers should return 400 ("taskId" < 0)', async () => {
    let invalidPayload = {
        userId: 2,
        assignmentId: 4,
        taskId: -1,
        answer: "Yes"
    };

    const res = await common.postAnswer(invalidPayload)

    expect(res.status).toBe(400);
});

test('POST /answers should return 400 ("answer" is missing)', async () => {
    let invalidPayload = {
        userId: 2,
        assignmentId: 4,
        taskId: 8
    };

    const res = await common.postAnswer(invalidPayload)

    expect(res.status).toBe(400);
});

test('GET /answers/:id should return an object', async () => {
    const res = await common.getAnswer(1);

    expect(res.status).toBe(200)
});

test('GET /answers/:id should return 400 ("id" < 0)', async () => {
    const res = await common.getAnswer(-1);

    expect(res.status).toBe(400)
});

test('GET /answers/:id should return 404 (answer not found)', async () => {
    const res = await common.getAnswer(999);

    expect(res.status).toBe(404)
});

test('POST /answers/:id/reviews should return the review', async () => {
    let validPayload = {
        text: "Nice job."
    }

    const res = await common.postAnswersReview(1, validPayload)

    expect(res.status).toBe(200);
    expect(res.body).toEqual(validPayload);
});

test('POST /answers/:id/reviews should return 400 ("id" < 0)', async () => {
    let validPayload = {
        text: "Nice job."
    }

    const res = await common.postAnswersReview(-1, validPayload)

    expect(res.status).toBe(400);
});

test('POST /answers/:id/reviews should return 400 ("text" = "")', async () => {
    let invalidPayload = {
        text: ""
    }

    const res = await common.postAnswersReview(1, invalidPayload)

    expect(res.status).toBe(400);
});

test('POST /answers/:id/reviews should return 404 (answer not found)', async () => {
    let validPayload = {
        text: "Nice job"
    }

    const res = await common.postAnswersReview(999, validPayload)

    expect(res.status).toBe(404);
});

test('GET /answers/:id/reviews should return an array', async () => {
    const res = await common.getAnswersReview(1);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true)
});

test('GET /answers/:id/reviews should return 400 ("id" < 0)', async () => {
    const res = await common.getAnswersReview(-1);

    expect(res.status).toBe(400);
});

test('GET /answers/:id/reviews should return 404 (answer not found)', async () => {
    const res = await common.getAnswersReview(999);

    expect(res.status).toBe(404);
});

test('DELETE /answers/:id should return 204', async () => {
    const res = await common.deleteAnswer(1);

    expect(res.status).toBe(204);
});

test('DELETE /answers/:id should return 400 ("id" < 0)', async () => {
    const res = await common.deleteAnswer(-1);

    expect(res.status).toBe(400);
});

test('DELETE /answers/:id should return 404 (answer not found)', async () => {
    const res = await common.deleteAnswer(999);

    expect(res.status).toBe(404);
});