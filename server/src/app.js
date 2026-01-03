require('dotenv').config();
const express = require('express');
const cors = require('cors');
const prisma = require('./prisma');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const cityRoutes = require('./routes/cityRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/expenses', expenseRoutes);

async function connectWithRetry() {
    const maxRetries = 10;
    let retries = 0;
    while (retries < maxRetries) {
        try {
            await prisma.$connect();
            console.log('Database connected successfully');
            return true;
        } catch (error) {
            retries++;
            console.log(`Database connection failed (Attempt ${retries}/${maxRetries}). Retrying in 5 seconds...`);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
    return false;
}

async function main() {
    const connected = await connectWithRetry();
    if (connected) {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } else {
        console.error('Could not connect to database after multiple attempts. Please ensure PostgreSQL is running.');
        // Don't exit process in dev mode so it doesn't crash nodemon repeatedly in a loop if configured that way, 
        // but here we want to let the user know.
        process.exit(1);
    }
}

main();
