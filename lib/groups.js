const db = require('./db');

const getGroups = (req, res) => {
    let groups = db.groups.find();
    res.status(200).json(groups);
};

module.exports = {
    getGroups
}