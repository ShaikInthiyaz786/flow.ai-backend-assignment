const db = require('../utils/db');

const summaryController = {
    getSummary: (req, res) => {
        const { startDate, endDate, category } = req.query;
        let query = 'SELECT type, SUM(amount) AS total FROM transactions WHERE 1=1';
        let params = [];

        if (startDate && endDate) {
            query += ' AND date BETWEEN ? AND ?';
            params.push(startDate, endDate);
        }

        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }

        query += ' GROUP BY type';

        db.all(query, params, (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to retrieve summary' });
            }
            let summary = { income: 0, expense: 0, balance: 0 };
            rows.forEach(row => {
                if (row.type === 'income') {
                    summary.income += row.total;
                } else {
                    summary.expense += row.total;
                }
            });
            summary.balance = summary.income - summary.expense;
            res.status(200).json(summary);
        });
    }
};

module.exports = summaryController;
