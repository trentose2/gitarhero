const request = require('supertest');
const app = require('./app');

test('POST /tasks should return 201 and the created task', (done) => {
    let payload = {
        type: 'Open question',
        topic: 'Maths',
        question: 'How do you calcuate the area of a rectangle?',
        answer: 'Multiply its height by its width',
    };

    request(app)
        .post('/api/v1/tasks')
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

test('POST /tasks should return 400 when "type" is missing', (done) => {
    let payload = {
        //type: 'Open question',
        topic: 'Maths',
        question: 'How do you calcuate the area of a rectangle?',
        answer: 'Multiply its height by its width',
    };

    request(app)
        .post('/api/v1/tasks')
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

test('POST /tasks should return 400 when "type" is not "Open question" or "Multiple choice"', (done) => {
    let payload = {
        type: 12345,
        topic: 'Maths',
        question: 'How do you calcuate the area of a rectangle?',
        answer: 'Multiply its height by its width',
    };

    request(app)
        .post('/api/v1/tasks')
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

test('POST /tasks should return 400 when "type" is "Multiple choice" but there is no "choices" field', (done) => {
    let payload = {
        type: 'Multiple choice',
        topic: 'Maths',
        question: 'What do you get if you multiply 2 by 3?',
        //choices: ['6', '4'],
        answer: '6',
    };

    request(app)
        .post('/api/v1/tasks')
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

test('POST /tasks should return 400 when "topic" is missing', (done) => {
    let payload = {
        type: 'Open question',
        //topic: 'Maths',
        question: 'How do you calcuate the area of a rectangle?',
        answer: 'Multiply its height by its width',
    };

    request(app)
        .post('/api/v1/tasks')
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

test('POST /tasks should return 400 when "topic" is not a string', (done) => {
    let payload = {
        type: 'Open question',
        topic: 12345,
        question: 'How do you calcuate the area of a rectangle?',
        answer: 'Multiply its height by its width',
    };

    request(app)
        .post('/api/v1/tasks')
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

test('POST /tasks should return 400 when "question" is missing', (done) => {
    let payload = {
        type: 'Open question',
        topic: 'Maths',
        //question: 'How do you calcuate the area of a rectangle?',
        answer: 'Multiply its height by its width',
    };

    request(app)
        .post('/api/v1/tasks')
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

test('POST /tasks should return 400 when "question" is not a string', (done) => {
    let payload = {
        type: 'Open question',
        topic: 'Maths',
        question: 12345,
        answer: 'Multiply its height by its width',
    };

    request(app)
        .post('/api/v1/tasks')
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

test('POST /tasks should return 400 when "type" is "Open question" and "question" is not a string', (done) => {
    let payload = {
        type: 'Open question',
        topic: 'Maths',
        question: 12345,
        answer: 'Multiply its height by its width',
    };

    request(app)
        .post('/api/v1/tasks')
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

/* Se il field "type" è "Multiple choices", allora ci deve per forza essere il field "choices" */
test('POST /tasks should return 400 when "type" is "Multiple choice" and field "choices" is absent', (done) => {
    let payload = {
        type: 'Multiple choice',
        topic: 'Maths',
        question: 'What do you get if you multiply 2 by 3?',
        //choices: ['6', '4'],
        answer: '6',
    };

    request(app)
        .post('/api/v1/tasks')
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
/* Oltretutto, il field "choices" deve essere esclusivamente di stringhe, per convenzione */
test('POST /tasks should return 400 when "type" is "Multiple choice" and field "choices" is absent', (done) => {
    let payload = {
        type: 'Multiple choice',
        topic: 'Maths',
        question: 'What do you get if you multiply 2 by 3?',
        choices: [6, '4'],
        answer: '6',
    };

    request(app)
        .post('/api/v1/tasks')
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
/* E non è ammesso che il field 'choices' sia presente se 'type' è 'Open question' */
test('POST /tasks should return 400 when "type" is "Multiple choice" and field "choices" is absent', (done) => {
    let payload = {
        type: 'Open question',
        topic: 'Maths',
        question: 'How do you calculate the area of a square?',
        choices: ['Multiply its width by itself', 'Make a guessing'],
        answer: 'Multiply its height by its width',
    };

    request(app)
        .post('/api/v1/tasks')
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
test('POST /tasks should return 400 when "answer" is missing', (done) => {
    let payload = {
        type: 'Open question',
        topic: 'Maths',
        question: 'How do you calcuate the area of a rectangle?',
        //answer: 'Multiply its height by its width',
    };

    request(app)
        .post('/api/v1/tasks')
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

test('POST /tasks should return 400 when "answer" is not of type "string"', (done) => {
    let payload = {
        type: 'Open question',
        topic: 'Maths',
        question: 'How do you calcuate the area of a rectangle?',
        //answer: 'Multiply its height by its width',
    };

    request(app)
        .post('/api/v1/tasks')
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

/* Attenzione a questa sottigliezza */
test('POST /tasks should return 400 when the value of field "answer" is not contained in the array of field "choices"', (done) => {
    let payload = {
        type: 'Multiple choice',
        topic: 'Maths',
        question: 'What do you get if you multiply 2 by 3?',
        choices: [6, '4'],
        answer: '5',
    };

    request(app)
        .post('/api/v1/tasks')
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