#GlobeTrotter

**GlobeTrotter** is a modern, AI-enhanced travel planning application designed to help users obtain personalized itineraries, estimate costs, and visualize their trips.

Built with **React**, **Node.js**, **Express**, **Prisma**, and **PostgreSQL**.



---

##  Features

-   **Interactive Dashboard**: View recent trips and popular destinations.
-   **Itinerary Builder**: Drag-and-drop or detailed daily planning.
-   **Smart Budgeting**: Automatic cost estimation for activities and travel.
-   **Visual Timeline**: See your trip flow at a glance.
-   **Authentication**: Secure signup and login.

---

## 🛠️ Tech Stack

-   **Frontend**: React (Vite), CSS Modules, Lucide Icons
-   **Backend**: Node.js, Express.js
-   **Database**: PostgreSQL, Prisma ORM
-   **Authentication**: JWT (JSON Web Tokens)

---

## How to Run Locally

Follow these steps to set up the project on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/Harish-Raj-K/Globe-Trotter.git
cd Globe-Trotter
```

### 2. Install Dependencies

You need to install dependencies for both the **client** (frontend) and **server** (backend).

**Server:**
```bash
cd server
npm install
```

**Client:**
```bash
cd ../client
npm install
```

### 3. Environment Setup

Create a `.env` file in the `server` folder with the following variables:

```env
# server/.env

PORT=5000
DATABASE_URL="postgresql://postgres:password@localhost:5432/globetrotter?schema=public"
JWT_SECRET="your_super_secret_key"
```
*(Note: Replace `password` with your actual PostgreSQL password if different)*

### 4. Database Setup

Make sure your PostgreSQL server is running, then run the migrations and seed data:

```bash
# Inside the server/ directory
npx prisma migrate dev --name init
npx prisma db seed
```

### 5. Start the Application

You can run both client and server concurrently (if set up) or in separate terminals.

**Backend (Server):**
```bash
cd server
npm run dev
```

**Frontend (Client):**
```bash
cd client
npm run dev
```

Open your browser at `http://localhost:5173` to verify!

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
