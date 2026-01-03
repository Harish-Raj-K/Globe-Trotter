const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authenticate = require('../middleware/authMiddleware');

router.use(authenticate);

router.post('/', expenseController.addExpense);
router.get('/:tripId', expenseController.getExpenses);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
