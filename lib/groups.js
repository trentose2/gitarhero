const db = require('./db');

const postGroups = (req, res) => {
    let group = {
        name: req.body.name,
        members: req.body.members
    }

    if (!group.name || typeof group.name != 'string') {
        res.status(400).json({ error: 'The field "name" must be a non-empty string' });
        return;
    }

    for (let m of group.members) {
        if (!Number.isInteger(m) && m < 0) {
            res.status(400).json({ error: 'The field "members" must contain only integers greater or equal to 0' });
            return;
        }
    }

    db.groups.add(group);

    res.status(201).json(group);
};

module.exports = {
    postGroups
};