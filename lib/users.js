const db = require('./db');

const getUsers = (req, res) => {
    let id = parseInt(req.params.id, 10);

    if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: 'Field "id" must be a number and greater than 0' });
        return;
    }

    let user = db.users.findUserById(id);

    if (!user) {
        res.status(404).json({ error : 'user not found' });
    }

    res.status(200).json(user);
};

const postUsers = (req, res) => {
    let user = {
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        email: req.body.email
    };

    if (!user.name || typeof user.name != 'string') {
        res.status(400).json({ error: 'The field "name" must be a non-empty string' });
        return;
    }

    if (!user.surname || typeof user.surname != 'string') {
        res.status(400).json({ error: 'The field "surname" must be a non-empty string' });
        return;
    }

    if (!user.username || typeof user.username != 'string') {
        res.status(400).json({ error: 'The field "username" must be a non-empty string' });
        return;
    }
    
    if (!user.email || typeof user.email != 'string' || !checkIfEmailInString(user.email)) {
        res.status(400).json({ error: 'The field "email" must be a non-empty string, in email format' });
        return;
    }

    db.users.add(user);

    res.status(201).json(user);
};

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function checkIfEmailInString(text) {
    // eslint-disable-next-line
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(text);
}

module.exports = {
    postUsers,
    getUsers
};
