const db = require('../utils/db');

const CategoryModel = {
    findAll: (callback) => {
        const query = `SELECT * FROM categories`;
        db.all(query, [], (err, rows) => {
            callback(err, rows);
        });
    }
};

module.exports = CategoryModel;
