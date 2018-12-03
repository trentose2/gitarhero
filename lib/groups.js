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

    if(!(group.members instanceof Array)) {
        res.status(400).json({error : "The field members must be an array"});
        return;
    }

    for (let m of group.members) {
        if (!Number.isInteger(m) || m < 0 || m == 0) {
            res.status(400).json({ error: 'The field "members" must contain only integers greater or equal to 0' });
            return;
        }
    }

    db.groups.add(group);

    res.status(201).json(group);
};

const putGroups = (req, res) => {
    let group = {
        id : parseInt(req.params.id, 10),
        name: req.body.name,
        members: req.body.members
    }

    if (!group.name || typeof group.name != 'string') {
        res.status(400).json({ error: 'The field "name" must be a non-empty string' });
        return;
    }

    if(!group.members || !(group.members instanceof Array)) {
        res.status(400).json({error : "The field members must be a non-empty array"});
        return;
    }

    for (let m of group.members) {
        if (!Number.isInteger(m) || m < 0 || m == 0) {
            res.status(400).json({ error: 'The field "members" must contain only integers greater or equal to 0' });
            return;
        }
    }

    if(group.id < 0 || group.id == 0) {
        res.status(400).json({error: 'The id must be positive and greater than 0'});
        return;
    }

    if(db.groups.findOneById(group.id) == undefined) {
        res.status(404).json({error : 'group not found'});
        return;
    }

    db.groups.updateById(group);
    res.status(200).json(group);
};

const getGroupsMembers = (req, res) => {
    let id = parseInt(req.params.id, 10);

    if(id < 0 || id == 0) {
        res.status(400).json({error: 'The id must be positive and greater than 0'});
        return;
    }

    if(db.groups.findOneById(id) == undefined) {
        res.status(404).json({error : 'wrong id, group not found'});
        return;
    }

    let members = db.groups.findMembersByGroupId(id);
    res.status(200).json(members);
};

module.exports = {
    postGroups,
    getGroups,
    putGroups,
    getGroupsMembers
};
