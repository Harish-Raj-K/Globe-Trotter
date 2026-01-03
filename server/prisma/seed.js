const prisma = require('../src/prisma');

const cities = [
    { name: 'Paris', country: 'France', latitude: 48.8566, longitude: 2.3522, costIndex: 85, popularityScore: 98, imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34' },
    { name: 'London', country: 'UK', latitude: 51.5074, longitude: -0.1278, costIndex: 90, popularityScore: 95, imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad' },
    { name: 'New York', country: 'USA', latitude: 40.7128, longitude: -74.0060, costIndex: 95, popularityScore: 92, imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9' },
    { name: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503, costIndex: 80, popularityScore: 90, imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26' },
    { name: 'Dubai', country: 'UAE', latitude: 25.2048, longitude: 55.2708, costIndex: 88, popularityScore: 88, imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea904ac6666' },
    { name: 'Singapore', country: 'Singapore', latitude: 1.3521, longitude: 103.8198, costIndex: 82, popularityScore: 85, imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd' },
    { name: 'Rome', country: 'Italy', latitude: 41.9028, longitude: 12.4964, costIndex: 75, popularityScore: 91, imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5' },
    { name: 'Barcelona', country: 'Spain', latitude: 41.3851, longitude: 2.1734, costIndex: 70, popularityScore: 89, imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded' }
];

async function main() {
    console.log('Seeding cities...');
    for (const city of cities) {
        const exists = await prisma.city.findFirst({ where: { name: city.name } });
        if (!exists) {
            await prisma.city.create({ data: city });
        }
    }
    console.log('Done seeding.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
