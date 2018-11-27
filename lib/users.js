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
        res.status(400).json({ error: 'The field "surname" must be an array' });
        return;
    } 

    if (!user.username || typeof user.username != 'string') {
        res.status(400).json({ error: 'The field "username" must be an array' });
        return;
    }   
    
    if (!user.email || typeof user.email != 'string') {
        res.status(400).json({ error: 'The field "email" must be an array' });
        return;
    }  

    db.users.add(user);

    res.status(201).json(user);
};

module.exports = {
    postUsers,
    getUsers
};
