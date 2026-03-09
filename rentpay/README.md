# Rentpay – Rental E‑commerce Application

Production-ready rental e‑commerce app with React frontend, Node/Express backend, and separate admin dashboard.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Redux Toolkit, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT

## Project Structure

```
rentpay/
  client/     # React storefront (port 3000)
  server/     # Express API (port 5000)
  admin/      # React admin dashboard (port 3001)
```

## Prerequisites

- Node.js 18+
- MongoDB running locally or connection URI

## Setup

### 1. Backend

```bash
cd server
cp .env.example .env
# Edit .env: set MONGODB_URI and JWT_SECRET
npm install
npm run dev
```

### 2. Client (storefront)

```bash
cd client
cp .env.example .env
# Optional: VITE_API_URL for production; leave empty when using Vite proxy
npm install
npm run dev
```

Open: http://localhost:3000

### 3. Admin dashboard

```bash
cd admin
npm install
npm run dev
```

Open: http://localhost:3001 (login with an admin user).

### 4. Create first admin user

Admin users are normal users with `role: 'admin'`. Create one via API or MongoDB:

**Option A – Register then update in MongoDB**

1. Register via client: http://localhost:3000/register
2. In MongoDB: `db.users.updateOne({ email: "your@email.com" }, { $set: { role: "admin" } })`

**Option B – Seed script (create `server/seedAdmin.js` and run once)**

```js
import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const email = process.argv[2] || 'admin@rentpay.com';
const password = process.argv[3] || 'admin123';

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  let user = await User.findOne({ email });
  if (!user) user = await User.create({ name: 'Admin', email, password });
  user.role = 'admin';
  await user.save();
  console.log('Admin user ready:', email);
  process.exit(0);
}
seed().catch((e) => { console.error(e); process.exit(1); });
```

Run: `node seedAdmin.js admin@rentpay.com yourPassword`

## Environment Variables

### Server (`server/.env`)

- `PORT` – API port (default 5000)
- `MONGODB_URI` – MongoDB connection string
- `JWT_SECRET` – Secret for JWT signing

### Client (`client/.env`)

- `VITE_API_URL` – Backend base URL (empty when using Vite proxy in dev)
- `VITE_ADMIN_URL` – Admin app URL for “Admin” link (e.g. http://localhost:3001 when admin runs on port 3001)

## Run for production

1. **Server:** `cd server && npm start`
2. **Client:** `cd client && npm run build` – serve `dist/` with your web server
3. **Admin:** `cd admin && npm run build` – serve `dist/` (e.g. at `/admin` or separate subdomain)

## API Overview

- **Auth:** `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- **Products:** `GET/POST /api/products`, `GET/PUT/DELETE /api/products/:id`
- **Categories:** `GET/POST /api/categories`, `PUT/DELETE /api/categories/:id`
- **Cart:** `GET/POST /api/cart`, `POST /api/cart/add`, `POST /api/cart/remove`
- **Orders:** `POST/GET /api/orders`, `PUT /api/orders/:id/status` (admin)
- **Users:** `GET /api/users` (admin)

Protected and admin routes require `Authorization: Bearer <token>`.
