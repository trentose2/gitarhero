const request = require('supertest');
const app = require('../lib/app');

test('POST /marks should return 201 and the created mark', (done) => {
    let payload = {
        mark : 29,
        text : 'Ottimo lavoro!'
    };

    request(app)
        .post('/api/v1/marks')
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

/* Endpoint non valido */
test('GET /marks should return 400', (done) => {
    request(app)
        .get('/api/v1/marks')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }
            done(err);
        });
});

test('POST /marks should return 400 when "mark" is missing', (done) => {
    let payload = {
        //mark : 29,
        text : 'Ottimo lavoro!'
    };

    request(app)
        .post('/api/v1/marks')
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

/* Richiesta non valida: userId non è un numero */
test('GET /marks?userId=John should return 400', (done) => {
    request(app)
        .get('/api/v1/marks?userId=John')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }
            done(err);
        });
});


test('POST /marks should return 400 when "mark" is not a number', (done) => {
    let payload = {
        mark : 'Cat',
        text : 'Ottimo lavoro!'
    };

    request(app)
        .post('/api/v1/marks')
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

/* Richiesta non valida: userId è negativo */
test('GET /marks?userId=-12 should return 400', (done) => {
    request(app)
        .get('/api/v1/marks?userId=-12')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }
            done(err);
        });
});

test('POST /marks should return 400 when "mark" is not a number greater than 0', (done) => {
    let payload = {
        mark : -5,
        text : 'Ottimo lavoro!'
    };

    request(app)
        .post('/api/v1/marks')
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

/* Richiesta VALIDA: bulk request dei mark */
test('GET /marks?userId=12 should return 200 and the correspondent marks', (done) => {
    request(app)
        .get('/api/v1/marks')
        .query({ userId : '12' })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }
            done(err);
        });
});

/* Richiesta non valida: assignmentId da solo non ha senso */
test('GET /marks?assignmentId=5 should return 400', (done) => {
    request(app)
        .get('/api/v1/marks?assignmentId=5')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }
            done(err);
        });
});

test('POST /marks should return 400 when "text" is not a string', (done) => {
    let payload = {
        mark : 29,
        text : 12345
    };

    request(app)
        .post('/api/v1/marks')
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

/* Richiesta non valida: assignmentId non è un numero */
test('GET /marks?assignmentId=TestDiGeografia should return 400', (done) => {
    request(app)
        .get('/api/v1/marks?assignmentId=TestDiGeografia')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }
            done(err);
        });
});

test('POST /marks should return 400 when "text" is present but "mark" is not', (done) => {
    let payload = {
        text : 'Ottimo lavoro!'
    };

    request(app)
        .post('/api/v1/marks')
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

/* Richiesta non valida: assignmentId è negativo */
test('GET /marks?userId=12&assignmentId=-5 should return 400', (done) => {
    request(app)
        .get('/api/v1/marks?userId=12&assignmentId=-5')
        .expect('Content-Type', 'application/json; charset=utf-8')
		
        .expect(400)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }
            done(err);
        });
});

/* Richiesta VALIDA: richiesta di un mark specifico */
test('GET /marks?userId=12&assignmentId=5 should return 200 and the correspondent mark', (done) => {
    request(app)
        .get('/api/v1/marks')
        .query({ userId : '12', assignmentId : '5'})
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }
            done(err);
        });
});
