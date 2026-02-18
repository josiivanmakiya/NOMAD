# Local MongoDB Setup (Single DB for Users + Waitlist + Founder Data)

Yes, one MongoDB database stores:
- waitlist records (`GenesisWaitlist`)
- app users (`User`)
- deposit/lock lifecycle (`Deposit`, `Lock`, etc.)
- founder dashboard aggregates (queried from same collections)

## 1) Start MongoDB locally

If using local MongoDB service:
```bash
mongod
```

Or run MongoDB in Docker:
```bash
docker run -d --name nomad-mongo -p 27017:27017 mongo:7
```

## 2) Configure backend env

Copy:
```bash
cp backend/.env.example backend/.env
```

Set at minimum:
- `MONGO_URI=mongodb://127.0.0.1:27017/NOMAD`
- `ADMIN_API_KEY=<your-key>`
- `AUTH_BYPASS=false`

## 3) Configure frontend env

Copy:
```bash
cp frontend/.env.example frontend/.env.local
```

Set:
- `VITE_API_BASE_URL=http://localhost:5000`
- `VITE_FOUNDER_ADMIN_KEY=<same ADMIN_API_KEY>`

Optional:
- `VITE_ENABLE_FOUNDER_DASHBOARD=true`
- `VITE_ENABLE_PUBLIC_AUTH_ROUTES=false`

## 4) Verify DB connectivity

```bash
cd backend
npm run db:check
```

Expected output includes:
- `MongoDB connected.`
- database name
- counts for users/waitlist/deposits

## 5) Run app

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

## Founder Dashboard (local)
- Route: `/founder/local` (or your custom `VITE_FOUNDER_DASHBOARD_PATH`)
- API: `GET /api/founder/users`
- Guarded by:
  - `requireAuth` middleware
  - `x-admin-key` (`ADMIN_API_KEY`)
