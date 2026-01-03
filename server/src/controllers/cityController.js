const prisma = require('../prisma');

const searchCities = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.json({ cities: [] });
        }

        const cities = await prisma.city.findMany({
            where: {
                OR: [
                    { name: { contains: q, mode: 'insensitive' } },
                    { country: { contains: q, mode: 'insensitive' } }
                ]
            },
            take: 20,
            orderBy: { popularityScore: 'desc' }
        });

        res.json({ cities });
    } catch (error) {
        console.error('Search Cities error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getTopCities = async (req, res) => {
    try {
        const cities = await prisma.city.findMany({
            take: 10,
            orderBy: { popularityScore: 'desc' }
        });
        res.json({ cities });
    } catch (error) {
        console.error('Get Top Cities error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    searchCities,
    getTopCities
};
