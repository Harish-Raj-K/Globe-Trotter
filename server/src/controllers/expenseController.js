const prisma = require('../prisma');

const addExpense = async (req, res) => {
    try {
        const { tripId, category, amount, description, date } = req.body;
        const userId = req.user.id;

        // Verify trip ownership
        const trip = await prisma.trip.findUnique({ where: { id: tripId } });
        if (!trip || trip.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const expense = await prisma.expense.create({
            data: {
                tripId,
                category,
                amount,
                description,
                date: date ? new Date(date) : new Date()
            }
        });

        res.status(201).json({ expense });
    } catch (error) {
        console.error('Add Expense error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getExpenses = async (req, res) => {
    try {
        const { tripId } = req.params;
        const userId = req.user.id;

        const trip = await prisma.trip.findUnique({ where: { id: tripId } });
        if (!trip || trip.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const expenses = await prisma.expense.findMany({
            where: { tripId },
            orderBy: { date: 'desc' }
        });

        res.json({ expenses });
    } catch (error) {
        console.error('Get Expenses error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const expense = await prisma.expense.findUnique({
            where: { id },
            include: { trip: true }
        });

        if (!expense || expense.trip.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await prisma.expense.delete({ where: { id } });
        res.json({ message: 'Expense deleted' });
    } catch (error) {
        console.error('Delete Expense error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    addExpense,
    getExpenses,
    deleteExpense
};
