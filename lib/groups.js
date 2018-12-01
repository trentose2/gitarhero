const db = require('./db');

const getGroups = (req, res) => {
    let groups = db.groups.find();
    res.status(200).json(groups);
};

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
        if (!Number.isInteger(m) && m < 0 && m == 0) {
            res.status(400).json({ error: 'The field "members" must contain only integers greater or equal to 0' });
            return;
        }
    }

    db.groups.add(group);

    res.status(201).json(group);
};

const putGroups = (req, res) => {
    let group = {
        id : req.params.id,
        name: req.body.name,
        members: req.body.members
    }

    db.groups.updateById(group);
    res.status(200).json(group);
};

const getGroupsMembers = (req, res) => {
    let id = req.params.id;

    let members = db.groups.getMembersById(id);
    res.status(200).json(members);
};

module.exports = {
    postGroups,
    getGroups,
    putGroups,
    getGroupsMembers
};
