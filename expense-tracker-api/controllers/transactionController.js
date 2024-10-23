const TransactionModel = require('../models/transactionModel');

const transactionController = {
    createTransaction: (req, res) => {
        const { type, category, amount, date, description } = req.body;
        TransactionModel.create({ type, category, amount, date, description }, (err, id) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to create transaction' });
            }
            res.status(201).json({ id });
        });
    },

    getAllTransactions: (req, res) => {
        TransactionModel.findAll((err, transactions) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to retrieve transactions' });
            }
            res.status(200).json(transactions);
        });
    },

    getTransactionById: (req, res) => {
        const { id } = req.params;
        TransactionModel.findById(id, (err, transaction) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to retrieve transaction' });
            }
            if (!transaction) {
                return res.status(404).json({ message: 'Transaction not found' });
            }
            res.status(200).json(transaction);
        });
    },

    updateTransaction: (req, res) => {
        const { id } = req.params;
        const { type, category, amount, date, description } = req.body;
        TransactionModel.update(id, { type, category, amount, date, description }, (err, changes) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update transaction' });
            }
            if (changes === 0) {
                return res.status(404).json({ message: 'Transaction not found' });
            }
            res.status(200).json({ message: 'Transaction updated' });
        });
    },

    deleteTransaction: (req, res) => {
        const { id } = req.params;
        TransactionModel.delete(id, (err, changes) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete transaction' });
            }
            if (changes === 0) {
                return res.status(404).json({ message: 'Transaction not found' });
            }
            res.status(200).json({ message: 'Transaction deleted' });
        });
    }
};

module.exports = transactionController;
