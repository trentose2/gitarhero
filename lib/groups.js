const db = require('./db');

const getGroups = (req, res) => {
    let groups = db.groups.find();

    if(!groups) {
        res.status(404).json({ error : "groups not found"});
    }

    res.status(200).json(groups);
};

module.exports = {
    getGroups
}