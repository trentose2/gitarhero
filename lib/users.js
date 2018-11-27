const db = require('./db');

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
    postUsers
};