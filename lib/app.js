const express = require('express');
const app = express();

app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found', status: 404 });
});

module.exports = app;
