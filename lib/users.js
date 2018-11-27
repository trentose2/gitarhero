const db = require('./db');

const getUsers = (req, res) => {
    let id = parseInt(req.params.id, 10);

    let user;
    if (!Number.isInteger(id) || id < 0) {
        res.status(400).json({ error: 'Field "id" must be a number and greater or equal than 0' });
        return;
    }

    user = db.users.findUserById(user);

    res.status(200).json(user);
};

module.exports = {
    getUsers
}