const request = require('supertest');
const app = require('./app');


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

/* Richiesta VALIDA: bulk request dei mark */
test('GET /marks?userId=12 should return 201 and the correspondent marks', (done) => {
    request(app)
        .get('/api/v1/marks')
        .query({ userId : '12' })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201)
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
test('GET /marks?userId=12&assignmentId=5 should return 201 and the correspondent mark', (done) => {
    request(app)
        .get('/api/v1/marks')
        .query({ userId : '12', assignmentId : '5'})
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201)
        .end((err, res) => {
            if (err && res.error) {
                console.log(res.error);
            }
            done(err);
        });
});