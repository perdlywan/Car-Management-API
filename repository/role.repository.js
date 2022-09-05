const db = require('../models/index.js');
const Role = db.role;

exports.findById = async(id) => {
    return await Role.findByPk(id);
};