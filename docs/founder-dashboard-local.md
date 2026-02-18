# Founder Dashboard (Local-Only)

This dashboard is hidden by default and intended for founder/admin use only.

## Frontend Flags (`frontend/.env.local`)
```bash
VITE_ENABLE_FOUNDER_DASHBOARD=true
VITE_FOUNDER_DASHBOARD_PATH=/founder/local
VITE_FOUNDER_ADMIN_KEY=your-local-admin-key

# Optional: hide public auth routes during waitlist-only launch
VITE_ENABLE_PUBLIC_AUTH_ROUTES=false
```

## Backend Flags (`backend/.env`)
```bash
ADMIN_API_KEY=your-local-admin-key
AUTH_BYPASS=false
NODE_ENV=development
```

## Access
- Route: value from `VITE_FOUNDER_DASHBOARD_PATH` (default `/founder/local`)
- API used by dashboard: `GET /api/founder/users`
- Backend still enforces:
  - `requireAuth`
  - `x-admin-key` validation (`ADMIN_API_KEY`)

## Behavior
- If founder dashboard flag is `false`, route is not mounted and page redirects to `/`.
- Public auth routes can be disabled for waitlist-only mode without deleting auth code.
