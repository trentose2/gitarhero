const common = require('./common');

beforeAll(async () => {
    /* Eventualmente, uso questa funzione per inizializzare il database con qualche valore */
});

test('GET /tasks/:id should return a task', async () => {
    // Simuliamo l'aggiunta di un task
    let validPayload = {
        type: 'Open question',
        topic: 'Maths',
        question: 'How do you calcuate the area of a rectangle?',
        answers: 'Multiply its height by its width',
    };

    let res = await common.postTask(validPayload);
    expect(res.status).toBe(201);

    validPayload.id = 1;

    let res2 = await common.getTask(1);
    expect(res2.status).toBe(200);
    expect(res2.body).toEqual(validPayload);
});

test('GET /tasks/foo should return 400', async () => {
    let res = await common.getTask("foo");
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid task ID');
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
    validPayload.id = 2; //2, in quanto il caso di prima aggiunge un task che ha id 1
    expect(res.body).toEqual(validPayload);

    // Get the task to check that it was actually created
    const res2 = await common.getTask(validPayload.id);

    expect(res2.status).toBe(200);
    expect(res2.body).toEqual(validPayload);
});

test('POST /tasks should return 400 when the field "type" is missing', async () => {
    let invalidPayload = {
        //type: 'Open question',
        topic: 'Maths',
        question: 'How do you calcuate the area of a rectangle?',
        answers: 'Multiply its height by its width',
    };
    
    const res = await common.postTask(invalidPayload);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "type" is mandatory and must be a non-empty string with value "Open question" or "Multiple choice"');
});

test('POST /tasks should return 400 when the field "type" is not a string that has the value "Open question" or "Multiple choice"', async () => {
    let invalidPayload = {
        type: 12345,
        topic: 'Maths',
        question: 'How do you calcuate the area of a rectangle?',
        answers: 'Multiply its height by its width',
    };
    
    const res = await common.postTask(invalidPayload);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "type" is mandatory and must be a non-empty string with value "Open question" or "Multiple choice"');
});

test('POST /tasks should return 400 when the field "type" has value "Multiple choice" but there is no field "choices"', async () => {
    let invalidPayload = {
        type: 'Multiple choice',
        topic: 'Maths',
        question: 'What do you get if you multiply 2 by 3?',
        //choices: ['6', '4'],
        answers: '6',
    };

    const res = await common.postTask(invalidPayload);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('If the field "type" has value "Multiple choice", then it is mandatory to have the field "choices"');
});

test('POST /tasks should return 400 when the field "topic" is missing', async () => {
    let invalidPayload = {
        type: 'Open question',
        //topic: 'Maths',
        question: 'How do you calcuate the area of a rectangle?',
        answers: 'Multiply its height by its width',
    };

    const res = await common.postTask(invalidPayload);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "topic" must is mandatory and must be a non-empty string');
});

test('POST /tasks should return 400 when the field "topic" is not a string', async () => {
    let invalidPayload = {
        type: 'Open question',
        topic: 12345,
        question: 'How do you calcuate the area of a rectangle?',
        answers: 'Multiply its height by its width',
    };

    const res = await common.postTask(invalidPayload);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "topic" must is mandatory and must be a non-empty string');
});

test('POST /tasks should return 400 when the field "question" is missing', async () => {
    let invalidPayload = {
        type: 'Open question',
        topic: 'Maths',
        //question: 'How do you calcuate the area of a rectangle?',
        answers: 'Multiply its height by its width',
    };

    const res = await common.postTask(invalidPayload);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "question" is mandatory and must be a non-empty string');
});

test('POST /tasks should return 400 when the field "question" is not a string', async () => {
    let invalidPayload = {
        type: 'Open question',
        topic: 'Maths',
        question: 12345,
        answers: 'Multiply its height by its width',
    };

    const res = await common.postTask(invalidPayload);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "question" is mandatory and must be a non-empty string');
});

test('POST /tasks should return 400 when the field "type" has value "Open question", but the field "answers" is not a string', async () => {
    let invalidPayload = {
        type: 'Open question',
        topic: 'Maths',
        question: 'How do you calcuate the area of a rectangle?',
        answers: 12345,
    };

    const res = await common.postTask(invalidPayload);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('If the field "type" has value "Open question", then the field "answers" is mandatory and must be a non-empty string');
});

test('POST /tasks should return 400 when the field "type" is "Multiple choice" and the field "choices" does not excusively consist of strings', async () => {
    let invalidPayload = {
        type: 'Multiple choice',
        topic: 'Maths',
        question: 'What do you get if you multiply 2 by 3?',
        choices: [6, '4'],
        answers: '6',
    };

    const res = await common.postTask(invalidPayload);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('If the field "type" has value "Multiple choice", then the field "choices" is mandatory and must be an array of strings');
});

test('POST /tasks should return 400 when the field "choices" is sent along with the field "Open question"', async () => {
    let invalidPayload = {
        type: 'Open question',
        topic: 'Maths',
        question: 'How do you calculate the area of a square?',
        choices: ['Multiply its width by itself', 'Make a guessing'],
        answers: 'Multiply its height by its width',
    };

    const res = await common.postTask(invalidPayload);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('If the field "type" has value "Open question", then the field "choices" is not allowed');
});

test('POST /tasks should return 400 when the field "answers" is missing', async () => {
    let invalidPayload = {
        type: 'Open question',
        topic: 'Maths',
        question: 'How do you calcuate the area of a rectangle?',
        //answers: 'Multiply its height by its width',
    };

    const res = await common.postTask(invalidPayload);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The field "answers" is mandatory');
});

test('POST /tasks should return 400 when a value in the field "answers" is not contained in the array of the field "choices"', async () => {
    let invalidPayload = {
        type: 'Multiple choice',
        topic: 'Maths',
        question: 'What do you get if you multiply 2 by 3?',
        choices: ['6', '4'],
        answers: [3]
    };

    const res = await common.postTask(invalidPayload);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The values contained in the field "answers" must represent valid indexes for the array of the field "choices"');
});

test('POST /tasks should return 400 when the field "choices" is not an array"', async () => {
    let invalidPayload = {
        type: 'Multiple choice',
        topic: 'Maths',
        question: 'What do you get if you multiply 2 by 3?',
        choices: "foo",
        answers: [3]
    };

    const res = await common.postTask(invalidPayload);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('If the field "type" has value "Multiple choice", then the field field "choices" is mandatory and must be an array');
});

test('POST /tasks should return 400 when the field "answers" is not an array"', async () => {
    let invalidPayload = {
        type: 'Multiple choice',
        topic: 'Maths',
        question: 'What do you get if you multiply 2 by 3?',
        choices: ['6', '4'],
        answers: 'foo'
    };

    const res = await common.postTask(invalidPayload);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('If the field "type" has value "Multiple choice", then the field "answers" is mandatory and must be an array');
});

test('POST /tasks should return 400 when there are values in the array of field "answers" that are not integers"', async () => {
    let invalidPayload = {
        type: 'Multiple choice',
        topic: 'Maths',
        question: 'What do you get if you multiply 2 by 3?',
        choices: ['6', '4'],
        answers: ['foo']
    };

    const res = await common.postTask(invalidPayload);
   
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('The values contained in the field "answers" must be integers');
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

test('PUT /tasks/3 should update the task', async () => {
    // Simuliamo l'aggiunta di un task e verifichiamo sia andata a buon fine
    let validPayload = {
        type: 'Open question',
        topic: 'Geografia',
        question: 'Quale è la capitale di Italia?',
        answers: 'Roma'
    };
    const postReq = await common.postTask(validPayload);
    expect(postReq.status).toBe(201); //Creato 
    validPayload.id = 3;
    let getReq = await common.getTask(validPayload.id);
    expect(getReq.status).toBe(200);
    expect(getReq.body).toEqual(validPayload);

    // Aggiorniamo il task
    let updatedData = {
        id : validPayload.id,
        answers: 'La capitale di Italia è Roma'
    };
    const putReq = await common.putTask(validPayload.id, updatedData);
    validPayload.answers = updatedData.answers;
    expect(putReq.status).toBe(200);
    expect(putReq.body).toEqual(validPayload);
});

test('PUT /tasks should return 404', async () => {
    let payload = {
        id : 2,
        answers: 'Foo'
    };
    const putReq = await common.putTask("", payload);
    expect(putReq.status).toBe(404);
});

test('PUT /tasks/foo should return 400', async () => {
    let payload = {
        id : 'foo',
        answers: 'fee'
    };
    const putReq = await common.putTask(payload.id, payload);
    expect(putReq.status).toBe(400);
    expect(putReq.body.error).toBe('Invalid task ID');
});

test('PUT /tasks/4 should return 404 because no task with id 5 exists', async () => {
    let payload = {
        type: 'Open question',
        topic: 'Cultura generale',
        question: 'Quanti mesi ha un anno?',
        answers: '12'
    };
    const putReq = await common.putTask(4, payload);
    expect(putReq.status).toBe(404);
});

test('PUT /tasks/3 should return 400 if the type of the task changed', async () => {
    let payload = {
        type: 'Multiple choice'
    };
    const putReq = await common.putTask(3, payload);
    expect(putReq.status).toBe(400);
    expect(putReq.body.error).toBe('Once that a task has been created, its type cannot be modified');
});

test('PUT /tasks/3 should return 400 if the type of the task is not a string', async () => {
    let payload = {
        type: 123
    };
    const putReq = await common.putTask(3, payload);
    expect(putReq.status).toBe(400);
    expect(putReq.body.error).toBe('The field "type" must be a non-empty string');
});

test('PUT /tasks/3 should return 200 if the topic of the task changed', async () => {
    let payload = {
        topic: 'Cultura generale'
    };
    const putReq = await common.putTask(3, payload);
    expect(putReq.status).toBe(200);
});

test('PUT /tasks/3 should return 400 if the topic of the task is not a string', async () => {
    let payload = {
        topic: 123
    };
    const putReq = await common.putTask(3, payload);
    expect(putReq.status).toBe(400);
    expect(putReq.body.error).toBe('The field "topic" must be a non-empty string');
});

test('PUT /tasks/3 should return 200 if the question of the task changed', async () => {
    let payload = {
        question: 'Qual è il capoluogo della regione Lazio?'
    };
    const putReq = await common.putTask(3, payload);
    expect(putReq.status).toBe(200);
});

test('PUT /tasks/3 should return 400 if the question of the task is not a string', async () => {
    let payload = {
        question: 123
    };
    const putReq = await common.putTask(3, payload);
    expect(putReq.status).toBe(400);
    expect(putReq.body.error).toBe('The field "question" must be a non-empty string');
});

test('PUT /tasks/3 should return 400 if the type of the task is "Open question" and the field "choices" is sent along the task', async () => {
    let payload = {
        choices : ['Roma', 'Napoli']
    };
    const putReq = await common.putTask(3, payload);
    expect(putReq.status).toBe(400);
    expect(putReq.body.error).toBe('If the type is "Open question", then the field "choices" is disallowed');
});

test('PUT /tasks/3 should return 400 if the type of the task is "Open question" and the field "answers" is an array', async () => {
    let payload = {
        answers : [1]
    };
    const putReq = await common.putTask(3, payload);
    expect(putReq.status).toBe(400);
    expect(putReq.body.error).toBe('The field "answers" must be a string');
});

test('PUT /tasks/4 should update the task', async () => {
    // Simuliamo l'aggiunta di un task e verifichiamo sia andata a buon fine
    let validPayload = {
        type: 'Multiple choice',
        topic: 'Corpo umano',
        question: 'Quanti sono i sensi umani?',
        choices: ['4', '5', '6'],
        answers: [1]
    };
    const postReq = await common.postTask(validPayload);
    expect(postReq.status).toBe(201); //Creato 
    validPayload.id = 4;
    let getReq = await common.getTask(validPayload.id);
    expect(getReq.status).toBe(200);
    expect(getReq.body).toEqual(validPayload);

    // Aggiorniamo il task
    let updatedData = {
        id : validPayload.id,
        choices: ['3', '4', '5', '6']
    };
    const putReq = await common.putTask(validPayload.id, updatedData);
    validPayload.choices = updatedData.choices;
    expect(putReq.status).toBe(200);
    expect(putReq.body).toEqual(validPayload);
});

test('PUT /tasks/4 should return 400 if the type of the task is "Multiple choice" and a null field "choices" is sent along the task', async () => {
    let payload = {
        choices : null
    };
    const putReq = await common.putTask(4, payload);
    expect(putReq.status).toBe(400);
    expect(putReq.body.error).toBe('The field "choices" must be an array');
});

test('PUT /tasks/4 should return 400 if the type of the task is "Multiple choice" and the the field "choices" is not an array', async () => {
    let payload = {
        choices : 'foo'
    };
    const putReq = await common.putTask(4, payload);
    expect(putReq.status).toBe(400);
    expect(putReq.body.error).toBe('The field "choices" must be an array');
});

test('PUT /tasks/4 should return 400 if the type of the task is "Multiple choice" and the the field "choices" is not an array of strings', async () => {
    let payload = {
        choices : ['foo', 2, 3, 'baz']
    };
    const putReq = await common.putTask(4, payload);
    expect(putReq.status).toBe(400);
    expect(putReq.body.error).toBe('The values in the array of field "choices" must be strings');
});

test('PUT /tasks/4 should return 400 if the type of the task is "Multiple choice" and a null field "answers" is sent along the task', async () => {
    let payload = {
        answers : null
    };
    const putReq = await common.putTask(4, payload);
    expect(putReq.status).toBe(400);
    expect(putReq.body.error).toBe('The field "answers" must be an array');
});

test('PUT /tasks/4 should return 400 if the type of the task is "Multiple choice" and the the field "answers" is not an array', async () => {
    let payload = {
        answers : 'foo'
    };
    const putReq = await common.putTask(4, payload);
    expect(putReq.status).toBe(400);
    expect(putReq.body.error).toBe('The field "answers" must be an array');
});

test('PUT /tasks/4 should return 400 if the type of the task is "Multiple choice" and the the field "answers" is not an array of integers', async () => {
    let payload = {
        answers : ['foo', 2, 3, 'baz']
    };
    const putReq = await common.putTask(4, payload);
    expect(putReq.status).toBe(400);
    expect(putReq.body.error).toBe('The values contained in the field "answers" must be integers');
});

test('PUT /tasks/4 should return 400 if the type of the task is "Multiple choice" and the the field "answers" contains integers that do not represent valid indexes for the elements in the array of the field "answers"', async () => {
    let payload = {
        answers : [8, 10]
    };
    const putReq = await common.putTask(4, payload);
    expect(putReq.status).toBe(400);
    expect(putReq.body.error).toBe('The values contained in the field "answers" must represent valid indexes for the array of the field "choices"');
});

test('PUT /tasks/4 should return 200 if the answers of the task changed', async () => {
    let payload = {
        answers : [3]
    };
    const putReq = await common.putTask(4, payload);
    expect(putReq.status).toBe(200);
});