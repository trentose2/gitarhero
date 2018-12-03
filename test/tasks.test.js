const common = require('./common');

const request = require('supertest');
const app = require('../lib/app');

/* Popoliamo il database mediante delle richieste ad-hoc */
beforeAll(async () => {
    /*
    await common.postTask({ type: 'Open question', topic: 'topic', question: 'Q', answers: 'A' })
        .expect(201);
    await common.postTask({ type: 'Open question', topic: 'topic', question: 'Q2', answers: 'A2' })
        .expect(201);
    await common.postUser({ name: 'Luigi', surname: 'Di Maio', username: 'giggino', email: 'luigi@dimaio.it' })
        .expect(201);
    await common.postGroup({ name: 'gg', members: [1] })
        .expect(201);
        */
});


test('POST /tasks should return 201 and the created task', async () => {
    let validPayload = {
        type: 'Open question',
        topic: 'Maths',
        question: 'How do you calcuate the area of a rectangle?',
        answers: 'Multiply its height by its width',
    };

    const res = await common.postTask(validPayload);
    
    // Check response status code
    expect(res.status).toBe(201);
        
    // Check the returned instance
    validPayload.id = 1;
    expect(res.body).toEqual(validPayload);

    // Get the task to check that it was actually created
    const res2 = await common.getTask(validPayload.id);

    expect(res2.status).toBe(200);
    expect(res2.body).toEqual(validPayload);
});

test('POST /tasks should return 400 when "type" is missing', async () => {
    let payloadWithMissingType = {
        //type: 'Open question',
        topic: 'Maths',
        question: 'How do you calcuate the area of a rectangle?',
        answers: 'Multiply its height by its width',
    };
    
    const res = await common.postTask(payloadWithMissingType);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "type" must be a non-empty string, with values: "Open question" or "Multiple choice');
});

test('POST /tasks should return 400 when "type" is not "Open question" or "Multiple choice"', async () => {
    let payloadWithIncorrectType = {
        type: 12345,
        topic: 'Maths',
        question: 'How do you calcuate the area of a rectangle?',
        answers: 'Multiply its height by its width',
    };
    
    const res = await common.postTask(payloadWithIncorrectType);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "type" must be a non-empty string, with values: "Open question" or "Multiple choice');
});

test('POST /tasks should return 400 when "type" is "Multiple choice" but there is no "choices" field', async () => {
    let payloadWithoutChoicesField = {
        type: 'Multiple choice',
        topic: 'Maths',
        question: 'What do you get if you multiply 2 by 3?',
        //choices: ['6', '4'],
        answers: '6',
    };

    const res = await common.postTask(payloadWithoutChoicesField);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Type "Multiple choice" implies field "choices"');
});

test('POST /tasks should return 400 when "topic" is missing', async () => {
    let payloadWithoutTopicField = {
        type: 'Open question',
        //topic: 'Maths',
        question: 'How do you calcuate the area of a rectangle?',
        answers: 'Multiply its height by its width',
    };

    const res = await common.postTask(payloadWithoutTopicField);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "topic" must be a string');
});

test('POST /tasks should return 400 when "topic" is not a string', async () => {
    let payloadWithIncorrectTopicField = {
        type: 'Open question',
        topic: 12345,
        question: 'How do you calcuate the area of a rectangle?',
        answers: 'Multiply its height by its width',
    };

    const res = await common.postTask(payloadWithIncorrectTopicField);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "topic" must be a string');
});

test('POST /tasks should return 400 when "question" is missing', async () => {
    let payloadWithMissingQuestionField = {
        type: 'Open question',
        topic: 'Maths',
        //question: 'How do you calcuate the area of a rectangle?',
        answers: 'Multiply its height by its width',
    };

    const res = await common.postTask(payloadWithMissingQuestionField);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "question" is mandatory and must be a string');
});

test('POST /tasks should return 400 when "question" is not a string', async () => {
    let payloadWithIncorrectQuestionFieldFormat = {
        type: 'Open question',
        topic: 'Maths',
        question: 12345,
        answers: 'Multiply its height by its width',
    };

    const res = await common.postTask(payloadWithIncorrectQuestionFieldFormat);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "question" is mandatory and must be a string');
});

//If type is "Open question", field "answers" must be a string
test('POST /tasks should return 400 when "type" is "Open question" and "answers" is not a string', async () => {
    let payloadWithMissingAnswerField = {
        type: 'Open question',
        topic: 'Maths',
        question: 'How do you calcuate the area of a rectangle?',
        answers: 12345,
    };

    const res = await common.postTask(payloadWithMissingAnswerField);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('If type is "Open question", field "answers" must be a string');
});

/* Se il field "type" è "Multiple choices", allora ci deve per forza essere il field "choices" */
test('POST /tasks should return 400 when "type" is "Multiple choice" and field "choices" is absent', async () => {
    let payloadWithMissingChoicesField = {
        type: 'Multiple choice',
        topic: 'Maths',
        question: 'What do you get if you multiply 2 by 3?',
        //choices: ['6', '4'],
        answers: '6',
    };

    const res = await common.postTask(payloadWithMissingChoicesField);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Type "Multiple choice" implies field "choices"');
});

/* Oltretutto, il field "choices" deve essere esclusivamente di stringhe, per convenzione */
test('POST /tasks should return 400 when "type" is "Multiple choice" and field "choices" does not excusively consist of strings', async () => {
    let payloadWithIncorrectQuestionFieldFormat = {
        type: 'Multiple choice',
        topic: 'Maths',
        question: 'What do you get if you multiply 2 by 3?',
        choices: [6, '4'],
        answers: '6',
    };

    const res = await common.postTask(payloadWithIncorrectQuestionFieldFormat);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Type "Multiple choice" implies "choices" to be an array of strings');
});

/* E non è ammesso che il field 'choices' sia presente se 'type' è 'Open question' */
test('POST /tasks should return 400 when field "choices" is sent along with an "Open question" field', async () => {
    let payloadWithExcessiveChoiceField = {
        type: 'Open question',
        topic: 'Maths',
        question: 'How do you calculate the area of a square?',
        choices: ['Multiply its width by itself', 'Make a guessing'],
        answers: 'Multiply its height by its width',
    };

    const res = await common.postTask(payloadWithExcessiveChoiceField);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Type "Open question" does not allow field "choices" to be defined');
});

test('POST /tasks should return 400 when "answers" is missing', async () => {
    let payloadWithMissingAnswerField = {
        type: 'Open question',
        topic: 'Maths',
        question: 'How do you calcuate the area of a rectangle?',
        //answers: 'Multiply its height by its width',
    };

    const res = await common.postTask(payloadWithMissingAnswerField);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "answers" is mandatory');
});

/* Una domanda a risposte multiple impone che il campo "answers" contenga valori che rappresentino indici validi per l'array "choices" */
test('POST /tasks should return 400 when a value in field "answers" is not contained in the array "choices"', async () => {
    let payloadWithIllicitAnswersFieldValues = {
        type: 'Multiple choice',
        topic: 'Maths',
        question: 'What do you get if you multiply 2 by 3?',
        choices: ['6', '4'],
        answers: [3]
    };

    const res = await common.postTask(payloadWithIllicitAnswersFieldValues);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Values contained in field "answers" must represent valid indexes for the "choices" array');
});

test('DELETE /tasks/1 should remove the task', async () => {
    const res = await common.deleteTask(1);

    expect(res.status).toBe(204);

    // Check if it was actually deleted
    const res2 = await common.getTask(1);
    expect(res2.status).toBe(404);  
});

test('DELETE /tasks/999 (non-existing task) should return an error', async () => {
    const res = await common.deleteTask(999);

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('No task with id 999 was found');
});

test('DELETE /tasks/0 (invalid task ID) should return an error', async () => {
    const res = await common.deleteTask(0);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid task ID');
});

test('DELETE /tasks/foo (invalid task ID) should return an error', async () => {
    const res = await common.deleteTask('foo');

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid task ID');
});