const db = require('../utils/db');

const TransactionModel = {
    create: (data, callback) => {
        const query = `INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`;
        db.run(query, [data.type, data.category, data.amount, data.date, data.description], function(err) {
            callback(err, this ? this.lastID : null);
        });
    },

    findAll: (callback) => {
        const query = `SELECT * FROM transactions`;
        db.all(query, [], (err, rows) => {
            callback(err, rows);
        });
    },

    findById: (id, callback) => {
        const query = `SELECT * FROM transactions WHERE id = ?`;
        db.get(query, [id], (err, row) => {
            callback(err, row);
        });
    },

    update: (id, data, callback) => {
        const query = `UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`;
        db.run(query, [data.type, data.category, data.amount, data.date, data.description, id], function(err) {
            callback(err, this.changes);
        });
    },

    delete: (id, callback) => {
        const query = `DELETE FROM transactions WHERE id = ?`;
        db.run(query, [id], function(err) {
            callback(err, this.changes);
        });
    }
};

module.exports = TransactionModel;
