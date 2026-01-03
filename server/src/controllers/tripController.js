const prisma = require('../prisma');

const createTrip = async (req, res) => {
    try {
        const { title, description, startDate, endDate, coverImage, budgetLimit, isPublic } = req.body;
        const userId = req.user.id; // From authMiddleware

        if (!title || !startDate || !endDate) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const trip = await prisma.trip.create({
            data: {
                userId,
                title,
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                coverImage,
                budgetLimit,
                isPublic: isPublic || false
            }
        });

        res.status(201).json({ trip });
    } catch (error) {
        console.error('Create Trip error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getTrips = async (req, res) => {
    try {
        const userId = req.user.id;
        const trips = await prisma.trip.findMany({
            where: { userId },
            orderBy: { startDate: 'asc' },
            include: {
                destinations: {
                    include: { city: true }
                }
            }
        });
        res.json({ trips });
    } catch (error) {
        console.error('Get Trips error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getTripById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // Optional: if checking ownership

        const trip = await prisma.trip.findUnique({
            where: { id },
            include: {
                destinations: {
                    include: { city: true },
                    orderBy: { orderIndex: 'asc' }
                },
                itineraryItems: {
                    orderBy: { startTime: 'asc' }
                },
                expenses: true
            }
        });

        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        // Check ownership or public access
        if (trip.userId !== userId && !trip.isPublic) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        res.json({ trip });
    } catch (error) {
        console.error('Get Trip By ID error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateTrip = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const data = req.body;

        // Verify ownership
        const existingTrip = await prisma.trip.findUnique({ where: { id } });
        if (!existingTrip || existingTrip.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Parse dates if provided
        if (data.startDate) data.startDate = new Date(data.startDate);
        if (data.endDate) data.endDate = new Date(data.endDate);

        const trip = await prisma.trip.update({
            where: { id },
            data
        });

        res.json({ trip });
    } catch (error) {
        console.error('Update Trip error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteTrip = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const existingTrip = await prisma.trip.findUnique({ where: { id } });
        if (!existingTrip || existingTrip.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await prisma.trip.delete({ where: { id } });
        res.json({ message: 'Trip deleted successfully' });
    } catch (error) {
        console.error('Delete Trip error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addDestination = async (req, res) => {
    try {
        const { id } = req.params; // tripId
        const { cityId, arrivalDate, departureDate } = req.body;
        const userId = req.user.id;

        const trip = await prisma.trip.findUnique({ where: { id } });
        if (!trip || trip.userId !== userId) return res.status(403).json({ error: 'Unauthorized' });

        const destination = await prisma.tripDestination.create({
            data: {
                tripId: id,
                cityId,
                arrivalDate: new Date(arrivalDate),
                departureDate: new Date(departureDate)
            },
            include: { city: true }
        });

        res.status(201).json({ destination });
    } catch (error) {
        console.error('Add Destination error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addItem = async (req, res) => {
    try {
        const { id } = req.params; // tripId
        const { title, type, startTime, estimatedCost } = req.body;
        const userId = req.user.id;

        const trip = await prisma.trip.findUnique({ where: { id } });
        if (!trip || trip.userId !== userId) return res.status(403).json({ error: 'Unauthorized' });

        const item = await prisma.itineraryItem.create({
            data: {
                tripId: id,
                title,
                type,
                startTime: new Date(startTime),
                estimatedCost: estimatedCost ? parseFloat(estimatedCost) : 0
            }
        });

        res.status(201).json({ item });
    } catch (error) {
        console.error('Add Item error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteItem = async (req, res) => {
    try {
        const { id, itemId } = req.params; // tripId, itemId
        const userId = req.user.id;

        // Verify trip ownership
        const trip = await prisma.trip.findUnique({ where: { id } });
        if (!trip || trip.userId !== userId) return res.status(403).json({ error: 'Unauthorized' });

        await prisma.itineraryItem.delete({ where: { id: itemId } });
        res.json({ message: 'Item deleted' });
    } catch (error) {
        console.error('Delete Item error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createTrip,
    getTrips,
    getTripById,
    updateTrip,
    deleteTrip,
    addDestination,
    addItem,
    deleteItem
};
